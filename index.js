//Include the exporter module
const exporter = require('highcharts-export-server'),
    fs = require('fs');


//Export settings 
var exportSettings = {
    type: 'PNG',
    options: {
        title: {
            text: 'Validatum'
        },
        yAxis: {
            title: {
                text: 'sales'
            }
        },
        xAxis: {
            title: {
                text: '2018'
            },
            categories: ["Jan", "Feb", "Mar", "Apr", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        series: [{
                name: 'wibble',
                type: 'line',
                data: [1, 3, 2, 4]
            },
            {
                name: 'wobble',
                type: 'line',
                data: [5, 3, 4, 2]
            },
            {
                name: 'wabble',
                type: 'line',
                data: [3, 4, 2, 1]
            }
        ]
    }
};

//Set up a pool of PhantomJS workers
exporter.initPool();

//Perform an export
/*
    Export settings corresponds to the available CLI arguments described
    above.
*/
exporter.export(exportSettings, function (err, res) {
    console.log("exporting .....");
    //The export result is now in res.
    //If the output is not PDF or SVG, it will be base64 encoded (res.data).
    //If the output is a PDF or SVG, it will contain a filename (res.filename).
    if (res.data) {
        require("fs").writeFile("test.png", res.data, 'base64', function (err) {
            if (err) {
                console.log(err);
            }
            //Kill the pool when we're done with it, and exit the application
            exporter.killPool();
            process.exit(1);
        });
    }
});