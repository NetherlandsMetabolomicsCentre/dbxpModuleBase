package org.dbxp.moduleBase

/**
 * Minimal representation of a study. The studyToken is the link with a study object in GSCF.
 * 
 * @see GscfService.getStudy
 */
class Study {
	def gscfService
	
	String studyToken
	String name

	// If a study is set to be dirty, it should be updated
	// the next time synchronization takes place.
	Boolean isDirty = true;
	
	// Version number that corresponds with the GSCF version. Is used
	// to determine whether this study object is out of sync
	Integer gscfVersion = 0;
	
	public String viewUrl() {
		return gscfService.urlViewStudy( studyToken );
	}
	
	static hasMany = [assays: Assay, auth: Auth]
	static mapping = {
		columns {
			studyToken index:'studytoken_idx'
		}
		assays cascade: "all-delete-orphan"
		samples cascade: "all-delete-orphan"
		auth cascade: "all-delete-orphan"
		auth lazy: false, batchSize: 10
	}

	static constraints = {
		studyToken(unique:true)
		name(nullable:true)
		isDirty(nullable:true)
	}

	public boolean equals( Object o ) {
		if( o == null )
			return false
		
		if( o instanceof Study ) {
			return (o.id != null && this.id != null && o.id == this.id);
		} else {
			return false
		}
	}

	public boolean canRead( User user ) {
		Auth authorization = auth.find { it.user.equals( user ) }
		
		if( !authorization ) 
			return false
		
		return authorization.canRead
	}
	
	public boolean canWrite( User user ) {
		Auth authorization = auth.find { it.user.equals( user ) }
		
		if( !authorization ) 
			return false
		
		return authorization.canWrite
	}

	public boolean isOwner( User user ) {
		Auth authorization = auth.find { it.user.equals( user ) }
		
		if( !authorization ) 
			return false
		
		return authorization.isOwner
	}
	
	public String token() { return studyToken; }
	public String toString() { return "Study " + id + ": " + ( name ?: "" ) }

	/**
	 * Convenience method to check whether this object should be synchronized with GSCF
	 * @return	true if the study version in GSCF is different from this object
	 */
	public boolean shouldSynchronize( String sessionToken ) {
		// Always synchronize if object is dirty
		if ( isDirty )
			return true;
		
		// Warn if no sessiontoken is given
		if( !sessionToken ) {
			log.warn "No sessiontoken given for study version check. No check performed"
			return false;
		}
		
		try {
			def versionNumber = gscfService.getStudyVersion( sessionToken, studyToken )
			
			return ( versionNumber != gscfVersion )
		} catch( ResourceNotFoundException e ) {
			// If the study is not found, it should be synchronized anyway to delete it from the module
			return true;
		} catch( Exception e ) {
			// If an other exception occurs, the study isn't accessible. In that case,
			// no synchronization should take place
			return false
		}
	}
}