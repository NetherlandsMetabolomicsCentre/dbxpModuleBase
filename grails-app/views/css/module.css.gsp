/**
 * This file should not be called directly, but only via css controller module action
 */
body {
	margin: 0;
	padding: 0;
	font: 11px normal Arial, Helvetica, sans-serif;
	background-color: #fff;
	text-align: center;
}

.container { margin: 0 auto; text-align: left; }
.ui-dialog { text-align: left; }
#header { text-align: left; }

/*a:link, a:visited, a:hover {
	color: #ff7900;
	font-weight: normal;
	text-decoration: none;
}*/

a img { border-width: 0; }
td.button { text-align: center; }

h1 {
	color: #006dba;
	font-weight: normal;
	font-size: 16px;
	margin: 1.2em 0 .3em 0;
}

h2 {
	color: #006dba;
	font-weight: bold;
	font-size: 12px;
	margin: 1.2em 0 .3em 0;
}

.dataTables_wrapper h1, .dataTables_wrapper h2 { margin-left: 5px; }
.dataTables_wrapper thead th { cursor: pointer; zoom: 1; }
.dataTables_wrapper thead th.nonsortable { cursor: default; }

/** START :: container **/
.container {
	width: 960px;
	margin: 0 auto;
	position: relative;
}

/** END :: container **/
/** START :: header **/
#header {
	width: 100%;
	border-bottom: 1px solid #359;
	color: #359;
}

/** END :: header **/
/** START :: topnav **/
#logo { float: left; font-weight: bold; font-size: 15px; line-height: 30px; padding-top: 3px; padding-left: 10px;  }

ul.topnav {
	list-style: none;
	padding: 0 20px;
	margin: 0;
	width: 960px;
	margin: 0 auto;
	position: relative;
	font-size: 1.2em;
	z-index: 995; /** Important: keeps submenu's on top of other elements in IE7. See http://www.shawnpreisz.com/css/z-index-internet-explorer-7-ie7#comment-547 */
}

ul.topnav li {
	float: left;
	margin: 0;
	padding: 0 6px;
	position: relative; /*--Declare X and Y axis base--*/
	z-index: 994; /** Important: keeps submenu's on top of other elements in IE7. See http://www.shawnpreisz.com/css/z-index-internet-explorer-7-ie7#comment-547 */
}

ul.topnav li img {
	border: none;
}

ul.topnav li a {
	padding: 10px 5px;
	color: #359;
	display: block;
	text-decoration: none;
	float: left;
}

ul.topnav li:hover {
	background-color: #F0F8FF;
}

ul.topnav li span {
/*--Drop down trigger styles--*/
	width: 17px;
	height: 35px;
	float: right;
	background: url(${g.resource( dir: 'images/topnav', file: 'subnav_btn.gif' )}) no-repeat right top;
}

ul.topnav li span.subhover {
	background-position: center bottom;
	cursor: pointer;
}

/*--Hover effect for trigger--*/
ul.topnav li ul.subnav {
	list-style: none;
	position: absolute; /*--Important - Keeps subnav from affecting main navigation flow--*/
	left: 0;
	top: 36px;
	margin: 0;
	padding: 0;
	display: none;
	float: left;
		width: 170px;
		-moz-border-radius-bottomleft: 5px;
		-moz-border-radius-bottomright: 5px;
		-webkit-border-bottom-left-radius: 5px;
		-webkit-border-bottom-right-radius: 5px;
	border: 1px solid #359;
	border-top-width: 0;
	background-color: #F0F8FF; 
	z-index: 991; /** Important: keeps submenu's on top of other elements in IE7. See http://www.shawnpreisz.com/css/z-index-internet-explorer-7-ie7#comment-547 */
}

ul.topnav li ul.subnav li {
	margin: 0;
	padding: 0;
	clear: both;
	width: 170px;
	position:relative;
	z-index: 990; /** Important: keeps submenu's on top of other elements in IE7. See http://www.shawnpreisz.com/css/z-index-internet-explorer-7-ie7#comment-547 */
}

html ul.topnav li ul.subnav li a {
	float: left;
	width: 145px;
	padding-left: 20px;
}

html ul.topnav li ul.subnav li a:hover {
/*--Hover effect for subnav links--*/
	background-color: white;
}

ul.topnav li.user_info { float: right; padding: 10px 5px 10px 20px; background: transparent url(${fam.icon( name: 'user' )}) center left no-repeat; }
ul.topnav li.user_info:hover { background-color: transparent; }
ul.topnav li.user_info a { background-image: none; float: none; display: inline; text-decoration: underline; padding: 0; margin: 0; }

/** END :: topnav **/

/** START :: content **/
#content {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 11px/12px;
	padding-bottom: 20px;
}

#content p {
	text-align: justify;
}

#content a:link, #content a:visited, #content a:hover {
	color: #006dba;
	text-decoration: none;
}

#content p img {
	display: run-in;
	float: right;
	padding: 2px;
	border: 1px solid #006dba;
	margin-left: 10px;
	margin-bottom: 10px;
	height: 120px;
}

#content p.message {
	border: 1px solid #ccc; /* #006dba; */
	margin-bottom: 10px;
	margin-top: 10px;

	background: #f7f7f7 url(${fam.icon( name: 'user' )}) 10px 10px no-repeat;
	padding: 10px 10px 10px 33px;
}

#content p.error {
	border: 1px solid #f99; /* #006dba; */
	margin-bottom: 10px;
	margin-top: 10px;

	background: #FAE6E6 url(${fam.icon( name: 'information' )}) 10px 10px no-repeat;
	padding: 10px 10px 10px 33px;
}


label {
	width: 120px;
	display: inline-block;
	vertical-align: top;
	zoom: 1; /* IE 6 & 7 hack */
	*display: inline; /* IE 6 & 7 hack */
}	 

/** END :: content **/
/** START :: footer **/
#footer {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 8pt;
	color: #727272;
	border-top: 1px solid #727272;
	padding-top: 5px;
}

#footer a:link, #footer a:visited, #footer a:hover {
	color: #006dba;
	font-weight: normal;
	text-decoration: none;
}

/** END :: footer **/

/** START :: TABLES **/
table {
	border: 1px solid #ccc;
	width: 100%
}

tr {
	border: 0;
}

td, th {
	font: 11px verdana, arial, helvetica, sans-serif;
	line-height: 12px;
	padding: 5px 6px;
	text-align: left;
	vertical-align: top;
}

th {
	background: #fff url(${g.resource( dir: 'images/tables', file: 'shadow.jpg')});
	color: #666;
	font-size: 11px;
	font-weight: bold;
	line-height: 17px;
	padding: 2px 6px;
}

th a:link, th a:visited, th a:hover {
	color: #333;
	display: block;
	font-size: 10px;
	text-decoration: none;
	width: 100%;
}

th.asc a, th.desc a {
	background-position: right;
	background-repeat: no-repeat;
}

th.asc a {
	background-image: url(${g.resource( dir: 'images/tables', file: 'sorted_asc.gif')});
}

th.desc a {
	background-image: url(${g.resource( dir: 'images/tables', file: 'sorted_desc.gif')});
}

.odd {
	background: #f7f7f7;
}

.even {
	background: #fff;
}

/** END :: TABLES **/

/** START :: LIST **/
.list table {
	border-collapse: collapse;
}

.list th, .list td {
	border-left: 1px solid #ddd;
}

.list th:hover, .list tr:hover {
	background: #b2d1ff;
}

/** END :: LIST **/

/** START :: buttons **/
.buttons {
	margin-top: 15px;
	font-size: 10px;
}

.buttons a, .buttons input {
	font-size: 10px;
	font-weight: bold;
	margin-right: 15px;
	padding-top: 2px;
	padding-bottom: 2px;
	line-height: 20px;
	padding-left: 26px;	

	background-image: transparent;
	background-repeat: no-repeat;
	background-position: 3px 50%;

	color: #333;
}


/* Links in the buttons section should look just like buttons in the
   same section */
.buttons input {
	background-color: #fff;
	border-width: 0;
	cursor: pointer;
	overflow: visible;
}

/* Reset the font weight for buttons occurring within the table */
td.buttons input {
	font-weight: normal;
}



.buttons .separator { margin-left: 20px; }

.buttons a.disabled { color: #aaa; cursor: default; }

.buttons .add, .buttons .create {
	background-image: url(${fam.icon( name: 'add')});
}
.buttons .edit {
	background-image:  url(${fam.icon( name: 'pencil')});
}
.buttons .delete, .buttons .remove {
	background-image: url(${fam.icon( name: 'delete')});
}

.buttons .back {
	background-image: url(${fam.icon( name: 'arrow_left' )});
}
.buttons .save {
	background-image:  url(${fam.icon( name: 'accept' )});
}
.buttons .cancel {
	background-image:  url(${fam.icon( name: 'arrow_left')});
}

.buttons .list, .buttons .backToList {
	background-image: url(${fam.icon( name: 'application')});
}
.buttons .list, .buttons .otherList {
	background-image: url(${fam.icon( name: 'application_view_detail')});
}

.buttons .addAssociation {
	background-image:  url(${fam.icon( name: 'application_add')});
}
.buttons .editAssociation {
	background-image:  url(${fam.icon( name: 'application_edit')});
}
.buttons .removeAssociation,
.buttons .deleteAssociation {
	background-image:  url(${fam.icon( name: 'application_delete')});
}

.buttons .excel {
	background-image: url(${fam.icon( name: 'page_excel')});
}

/* Hides the default navigation bar that is added by the Grails scaffolding */
.nav { display: none; }

/** END :: buttons **/

/** START :: pagination buttons **/
.paginateButtons {
	margin-top: 15px;
	overflow: auto;
	width: 100%;
}

.paginateButtons a,
.paginateButtons span.currentStep {
	border: solid 1px #ccc;
	margin-right: 2px;
	display: block;
	float: left;
	padding: 1px 6px;
	text-decoration: none;
}

.paginateButtons a {
	color: #0e509e;
}

.paginateButtons span.currentStep {
	background: #2e6ab1;
	color: #FFFFFF;
}

/** END :: pagination buttons **/

/* START :: ontology autocomplete */
.ui-autocomplete .ui-menu-item {
	font-size: 10px;
}

.ui-autocomplete .about {
	font-size: 8px;
	color: #006DBA;
}

.ui-autocomplete .from {
	font-size: 8px;
	color: #666;
}

/* END :: ontology autocomplete */

/* START :: special select option styles */
option.addMore {
	background: url(${fam.icon( name: 'add' )}) no-repeat left top;
	background-color: #333;
	padding-left: 18px;
	height: 16px;
	color: #fff;
	font-weight: bold;
}

option.modify {
	background: url(${fam.icon( name: 'modify' )}) no-repeat left top;
	background-color: #333;
	padding-left: 18px;
	height: 16px;
	color: #fff;
	font-weight: bold;
}

option.locked {
	background: url(${fam.icon( name: 'lock' )}) no-repeat left top;
	padding-left: 18px;
}

option.unlocked {
	padding-left: 18px;
}

/* END :: special select option styles */

.spinner {
    background: url(${g.resource( dir: 'images', file: 'spinner.gif' )}) no-repeat left top;
    width: 16px;
    height: 16px;
    display: none;
}

.disabled { 
	opacity: 0.5;
	-moz-opacity:0.5;
	-khtml-opacity:0.5;
	filter:alpha(opacity=50);
}

.ui-dialog a:link, .ui-dialog a:visited, .ui-dialog a:hover {
	color: #006dba;
	text-decoration: none;
}
