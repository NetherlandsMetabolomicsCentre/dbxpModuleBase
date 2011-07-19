/*
	Usage:

	Use a 'paginate' class on a table to create a paginated table using datatables plugin.

		<table class="datatables">
			<thead>
				<tr><th>Name</th><th># samples</th></tr>
			</thead>
			<tbody>
				<tr><td>Robert</td><td>182</td></tr>
				<tr><td>Siemen</td><td>418</td></tr>
			</tbody>
		</table>

	will automatically create a paginated table, without any further actions. The pagination
	buttons will only appear if there is more than 1 page.

	You can use extra classes to determine datatables behaviour:
		class 'filter' can be added to the table to enable filtering
		class 'length_change' can be added to the table to enable length changing
		class 'sortable' can be added to the table to enable sorting
		class 'paginate' can be added to the table to enable pagination
		class 'hideInfo' can be added to hide the information about the number of items
	
	If you have added 'sortable' to the table, all column headers will be clickable to sort on. If you
	want a column not to be sortable, you can add class 'nonsortable' to the th.
	
	Serverside tables:
	
	When you have a table with lots of rows, creating the HTML table can take a while. You can also 
	create a table where the data for each page will be fetched from the server. This can be done using
	  
		<table class="datatables serverside" rel="/url/to/ajaxData">
			<thead>
				<tr><th>Name</th><th># samples</th></tr>
			</thead>
		</table>
	
	Where the /url/to/ajaxData is a method that returns the proper data for this table. See 
	http://www.datatables.net/examples/data_sources/server_side.html for more information about this method.

	// TODO: Test Serverside code
	// TODO: Test in Internet Explorer
 */

var numElements = new Array();		// Hashmap with the key being the id of the table, in order to facilitate multiple tables
var elementsSelected = new Array();	// Hashmap with the key being the id of the table, in order to facilitate multiple tables
var tableType = new Array();		// Hashmap with the key being the id of the table, in order to facilitate multiple tables
var selectType = new Array();       // Hashmap with the key being the id of the table, in order to facilitate multiple tables
var allElements = new Array();		// Hashmap with the key being the id of the table, in order to facilitate multiple tables

function initializePagination( selector ) {
	if( selector == undefined ) {
		selector = ''
	}
	
	// Initialize default pagination
	$( selector + ' table.datatables:not(.serverside)').each(function(idx, el) {
		var $el = $(el);
		
		tableType[ $el.attr( 'id' ) ] = "clientside";

        var id = $el.attr( 'id' );
        elementsSelected[ id ] = new Array();

        if($el.hasClass( 'selectMulti' )) {
            selectType[ $el.attr( 'id' ) ] = "selectMulti";
            $("#"+ id + ' thead tr').prepend("<th class='selectColumn nonsortable'><input id='"+id+"_checkAll' class='' type='checkbox' onClick='clickCheckAll(this);'></th>");
            $("#"+ id + ' tbody tr').each(function(idxrow, row) {
                rowid = $(row).attr('id');
                rowid = rowid.replace("rowid_","");
                $(row).prepend("<td class='selectColumn'><input id='"+id+"_ids' type='checkbox' onclick='clickRow(this);' value='"+rowid+"' name='"+id+"_ids'></td>");
            });

        } else if($el.hasClass( 'selectOne' )) {
            selectType[ $el.attr( 'id' ) ] = "selectOne";
            $("#"+ id + ' thead tr').prepend("<th class='selectColumn nonsortable'></th>");
            $("#"+ id + ' tbody tr').each(function(idxrow, row) {
                rowid = $(row).attr('id');
                rowid = rowid.replace("rowid_","");
                $(row).prepend("<td class='selectColumn'><input id='"+id+"_ids' type='radio'  onclick='clickRow(this);' value='"+rowid+"' name='"+id+"_ids'></td>");
            });
        } else {
            selectType[ $el.attr( 'id' ) ] = "selectNone";
        }

        $el.dataTable({
			bJQueryUI: true, 
			bAutoWidth: false,
			bFilter: $el.hasClass( 'filter' ), 
			bLengthChange: $el.hasClass( 'length_change' ), 
			bPaginate: $el.hasClass( 'paginate' ),
			bSort: $el.hasClass( 'sortable' ),
			bInfo: !$el.hasClass( 'hideInfo' ),
			iCookieDuration: 86400,				// Save cookie one day
			sPaginationType: 'full_numbers',
			iDisplayLength: 10,					// Number of items shown on one page.
			aoColumnDefs: [
				{ "bSortable": false, "aTargets": ["nonsortable"] },				// Disable sorting on all columns with th.nonsortable
				{ "sSortDataType": "formatted-num", "aTargets": ["formatted-num"] }	// Make sorting possible on formatted numbers
			],
            fnDrawCallback: function() {
                updateCheckAll( $el );
            }
		});

        numElements[ id ] = 0;
        allElements[ id ] = new Array();
        $("#"+id+"_info").after("<span id='"+id+"_selectinfo'></span>");
	});

	// Initialize serverside pagination
	$( selector + ' table.datatables.serverside').each(function(idx, el) {
		var $el = $(el);
		
		// Determine data url from rel attribute
		var dataUrl = $el.attr('rel');
		var id = $el.attr( 'id' );
		
		tableType[ id ] = "serverside";
		elementsSelected[ id ] = new Array();

		$el.dataTable({ 
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource": dataUrl,
			sDom: '<"H"lf>rt<"F"ip>',

			bJQueryUI: true, 
			bAutoWidth: false,
			bFilter: $el.hasClass( 'filter' ), 
			bLengthChange: $el.hasClass( 'length_change' ), 
			bPaginate: $el.hasClass( 'paginate' ),
			bSort: $el.hasClass( 'sortable' ),
			bInfo: !$el.hasClass( 'hideInfo' ),
			iCookieDuration: 86400,				// Save cookie one day
			sPaginationType: 'full_numbers',
			iDisplayLength: 10,					// Number of items shown on one page.
			aoColumnDefs: [
				{ "bSortable": false, "aTargets": ["nonsortable"] },				// Disable sorting on all columns with th.nonsortable
				{ "sSortDataType": "formatted-num", "aTargets": ["formatted-num"] }	// Make sorting possible on formatted numbers
			],
			
			// Override the fnServerData in order to show/hide the paginated
			// buttons if data is loaded
			"fnServerData": function ( sSource, aoData, fnCallback ) {
				$.ajax( {
					"dataType": 'json', 
					"type": "POST", 
					"url": sSource, 
					"data": aoData, 
					"success": function( data, textStatus, jqXHR ) {
						fnCallback( data, textStatus, jqXHR );
						showHidePaginatedButtonsForTableWrapper( $el.parent() );
						
						// Save total number of elements
						numElements[ id ] = data[ "iTotalRecords" ];
						allElements[ id ] = data[ "aIds" ];
						
						// Find which checkboxes are selected
						checkSelectedCheckboxes( $el.parent() );
					}
				} );
			}			
		});

        $("#"+id+"_info").after("<span id='"+id+"_selectinfo'></span>");
	});

	// Show hide paginated buttons
	showHidePaginatedButtons( selector );
}

function showHidePaginatedButtons( selector ) {
	// Remove the top bar of the datatable and hide pagination with only one page
	$( selector + " .dataTables_wrapper").each(function(idx, el) {
		var $el = $(el);
		showHidePaginatedButtonsForTableWrapper( $el )
	});	
}

function showHidePaginatedButtonsForTableWrapper( el ) {
	// Hide the top bar for the table if neither filter and length_change are enabled
	if( tableWrapperHasClass( el, 'filter' ) || tableWrapperHasClass( el, 'length_change' ) ) 
		el.find( 'div.ui-toolbar' ).first().show();
	else 
		el.find( 'div.ui-toolbar' ).first().hide();

	// Hide footer if info is turned off and pagination has 1 page or is not present
	if( tableWrapperHasClass( el, 'hideInfo' ) && ( 
			!tableWrapperHasClass( el, 'paginate' ) || 
			el.find('span span.ui-state-default:not(.ui-state-disabled)').size() == 0		
	    ) 
	) {
		el.find( 'div.ui-toolbar' ).last().hide();
	} else {
		el.find( 'div.ui-toolbar' ).last().show();
	}	
}

/**
 * Returns true if the datatables table within the tableWrapper has a specific class
 * @param tableWrapper
 * @param className
 */
function tableWrapperHasClass( tableWrapper, className ) {
	return $(tableWrapper).find( 'table' ).hasClass( className );
}

/**********************************************************************
 * 
 * These function are used for handling selectboxes and select-all boxes. In fact, there are
 * four methods:
 * 
 * checkSelectedCheckboxes  	checks selectboxes based on the ids previously selected (when 
 * 								showing a new page in a serverside paginated table)
 * checkAllPaginated (cs & ss)	handles a click on the 'checkAll' button: checks all items if
 * 								not all items were selected, and deselects all items if all
 * 								items were selected
 * updateCheckAll (cs & ss)		updates the checkAll checkbox so it shows the current status:
 * 								checked if everything is selected, checked but transparent if
 * 								some items are selected and deselected if no items are selected
 * submitPaginatedForm			submits a form with the selected selectboxes in it.
 * 
 **********************************************************************/

function clickRow( inputrow ) {
    var input = $(inputrow);
	var paginatedTable = input.closest( '.datatables' );
	var dataTable = paginatedTable.closest( '.dataTables_wrapper' );
	var tableId = paginatedTable.attr( 'id' );

	// If the input is a normal checkbox, the user clicked on it. Update the elementsSelected array
	if( selectType[ tableId ] == "selectMulti" ) {
		var arrayPos = jQuery.inArray( parseInt( input.val() ), elementsSelected[ tableId ] );
		if( input.attr( 'checked' ) ) {
			// Put the id in the elementsSelected array, if it is not present
			if( arrayPos == -1 ) {
				elementsSelected[ tableId ][ elementsSelected[ tableId ].length ] = parseInt( input.val() );
			}
		} else {
			// Remove the id from the elementsSelected array, if it is present
			if( arrayPos > -1 ) {
				elementsSelected[ tableId ].splice( arrayPos, 1 );
			}
		}

        var checkAll = $( '#'+tableId+'_checkAll', paginatedTable );
        updateCheckAll( inputrow );
	} else {
        // Assumption: selectType[ tableId ] == "selectOne"
        elementsSelected[ tableId ][0] = parseInt( input.val() );
    }
}

function clickCheckAll( input ) {

    var paginatedTable = $(input).closest( '.datatables' );
    var tableId = paginatedTable.attr( 'id' );
	var checkAll = $( '#'+tableId+'_checkAll', paginatedTable );

    var inputsOnScreen = $( 'tbody input[type=checkbox]', paginatedTable );

    if( checkAll.attr( 'checked' ) ) {
        // Select all on current page
        for( var i = 0; i < inputsOnScreen.length; i++ ) {
            var input = $(inputsOnScreen[ i ] );
            if( input.attr( 'id' ) != "checkAll" ) {
                input.attr( 'checked', true );
                elementsSelected[ tableId ][ elementsSelected[ tableId ].length ] = parseInt( input.val() );
            }
        }
    } else {
        // Deselect all on current page
        for( var i = 0; i < inputsOnScreen.length; i++ ) {
            var input = $(inputsOnScreen[ i ] );
            if( input.attr( 'id' ) != "checkAll" ) {
                var arrPos = jQuery.inArray( parseInt( input.val() ), elementsSelected[ tableId ] );
                if( arrPos > -1 ) {
                    input.attr( 'checked', false );
                    elementsSelected[ tableId ].splice( arrPos, 1 );
                }
            }
        }
        checkAll.removeClass( 'transparent' );
    }
	updateCheckAll( input );
}

function updateCheckAll( input ) {

    var paginatedTable = $(input).closest( '.datatables' );
    var inputsOnScreen = $( 'tbody input[type=checkbox]', paginatedTable );

    var blnSelected = false;
    var blnAllSelected = true;

    for( var i = 0; i < inputsOnScreen.length; i++ ) {
        var input = $(inputsOnScreen[ i ] );
        if( input.attr( 'id' ) != "checkAll" ) {
            if(input.attr( 'checked' )) {
                blnSelected = true;
            } else {
                blnAllSelected = false;
            }
        }
    }

    var tableId = paginatedTable.attr( 'id' );
    var checkAll = $( '#'+tableId+'_checkAll', paginatedTable );

    checkAll.removeClass( 'transparent' );
    if(blnAllSelected) {
        checkAll.attr('checked', true);
	} else {
		if(blnSelected) {
            checkAll.addClass( 'transparent' );
        }
        checkAll.attr('checked', blnSelected);
    }

    $("#"+tableId+"_selectinfo").html(" ("+elementsSelected[ tableId ].length+" selected)");
}

function checkSelectedCheckboxes( wrapper ) {
	var inputsOnScreen = $( 'tbody input[type=checkbox]', $(wrapper) );
	var tableId = $( ".datatables", $(wrapper) ).attr( 'id' );

	for( var i = 0; i < inputsOnScreen.length; i++ ) {
		var input = $(inputsOnScreen[ i ] );
		if( input.attr( 'id' ) != "checkAll" ) {
			if( jQuery.inArray( parseInt( input.val() ), elementsSelected[ tableId ] ) > -1 ) {
				input.attr( 'checked', true );
			} else {
				input.attr( 'checked', false );
			}
		}
	}
    updateCheckAll( wrapper );
}

function submitPaginatedForm( id, url, nothingInFormMessage ) {

    var form = $("#"+id+"_form");

	// Remove all inputs created before
	$( '.created', form ).remove();

	// Find paginated form elements
	var paginatedTable = $("#"+id+"_table");
	var tableId = paginatedTable.attr( 'id' );

    var ids = elementsSelected[ tableId ];
    var formFilled = ( ids.length > 0 );

    $.each( ids, function(idx, id) {
        var input = $( '<input type="hidden" class="created" name="ids">');
        input.attr( 'value', id );
        form.append( input );
    });

	// Show a message if the form is not filled
	if( !formFilled ) {
		if( nothingInFormMessage != undefined ) {
			alert( nothingInFormMessage );
		}

		return false;
	}

	// Set form method to POST in order to be able to handle all items
	form.attr( 'method', 'POST' );

	if( url != '' )
		form.attr( 'action', url );

	form.submit();

}

$(function() { initializePagination(); });