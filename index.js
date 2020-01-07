const fs = require('fs');

fs.readFile('file.json','utf-8',function(err,my_file){
    
    if(err) {
        console.log('error in opening file.');
    }
    
    try {
        
        const parser = JSON.parse(my_file);
        
        var groups = parser['XMI']['Model']['packagedElement'][1]['groups'];
        
        var group_names = new Array();

        /* getting group names
        for(var i=0;i<groups.length;i++) {
            group_names.push(groups[i]._name);
        }

        console.log(group_names);
        
        // now getting node arrays is important task fetch node arrays from wherever they are in the code. 
        // this is not dyanamic task because node arrays are not organised in the proper manner

        // please perform following first
        // var a = parser['XMI']['Model']['packagedElement'][1]['groups'];
        // console.log(a);
        */
        var node_array = new Array();  // this array will store all the decision nodes
        var edges_array = new Array(); // this array will store all the edges 

        var temp = parser['XMI']['Model']['packagedElement'][1]['groups'][0]['node'];
        for(var i=0;i<temp.length;i++) {
            node_array.push(temp[i]);
        }
        
        var temp = parser['XMI']['Model']['packagedElement'][1]['node'];
        for(var i=0;i<temp.length;i++) {
            node_array.push(temp[i]);
        }
        
        var temp = parser['XMI']['Model']['packagedElement'][1]['edge'];
        for(var i=0;i<temp.length;i++) {
            edges_array.push(temp[i]);
        }


        var remove_elements = ['%5B','%5D','%20'];

        // console.log(node_array); this is our file node array which as all the nodes;
        // now we have to select only decision nodes in the node_array; lets traverse :-)
        for(var i=0;i<node_array.length;i++) {

            if(node_array[i]['_xmi:type'] === 'uml:DecisionNode') {

                // this is the decision node; take xmi id
                var node_xmi_id = node_array[i]['_xmi:id'];

                for(var j=0;j<edges_array.length;j++) {
                    
                    // Getting column name first
                    // check if xmi_id is matching with target
                    if(node_xmi_id === edges_array[j]._target) {
                        // if matched. get source
                        var source = edges_array[j]._source
                        // now match this source with xmi_id of nodes
                        for(var k=0;k<node_array.length;k++) {
                            if(source === node_array[k]['_xmi:id']) {
                                // this is our column name
                                var format_output = node_array[k]['_name'].replace('%20',' ');
                                console.log(format_output);
                                //console.log(node_array[k]['_name']);
                                break;
                            }
                        }
                    }
                    
                    // check if xmi_id is matching with source of any edge
                    if(node_xmi_id === edges_array[j]._source) {
                        // if yes this is value
                        console.log(edges_array[j]._name);
                    }
                }
                console.log();
            }
        }
    }
    catch(err) {
        console.log(err);
    }
    
})
