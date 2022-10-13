<template>
    <div>
        <div>
            <div class="card-body">
                <div id="piechart"></div>
            </div>
        </div>
    </div>
</template>
<script>

import {GoogleCharts} from 'google-charts';


export default {
    
    data() {
        return {
            displayMode: 'chart'
        }
    },

    methods: {

        // /**
        //  * affiche le google Chart avec les données fournies
        //  */
        // drawVisualization() {
        //     if (this.arrayStats.length) {
        //         let div = document.getElementById("chart-personnel-"+this.personnel.id);
    
        //         let dataTable = [
        //             ["Compteur", "Pris", "Refusé"]
        //         ];
    
        //         this.arrayStats.forEach(counter => {
        //             dataTable.push([counter.label, counter.approuved, counter.refused]);
        //         });
    
        //         // Some raw data (not necessarily accurate)
        //         let data = GoogleCharts.api.visualization.arrayToDataTable(dataTable);
        //         let options = {
        //             seriesType: "bars",
        //             series: {
        //                 0: { color: "#198754", visibleInLegend: false },
        //                 1: { color: "#adb5bd", visibleInLegend: false }
        //             }
        //         };
        //         let chart = new GoogleCharts.api.visualization.ComboChart(div);
        //         chart.draw(data, options);
        //     }
        // },
        /**
         * Affiche un diagramme
         */
        drawChart() {
            let div = document.getElementById('piechart');

            let data = [
                ['Task', 'Type de contrat'],
                ['CDI',     12],
                ['CDD',      45],
                ['Apprentissage',  2],
                ['Professionalisation', 3],
                ['Stage',    2]
            ];

            let options ={
                //contrats en cours
                is3D: false,
                pieHole: 0.4,
                pieSliceText:"value",
                slices: {

                    0:{color: "#0d6efd"},
                    1:{color: "#6610f2"},
                    2:{color: "#6f42c1"},
                    3:{color: "#d63384"},
                    4:{color: "#dc3545"},
                    5:{color: "#fd7e14"},
                    6:{color: "#ffc107"},
                    7:{color: "#198754"},
                    8:{color: "#20c997"},
                    9:{color: "#0dcaf0"},
                }
            }

            var visData = GoogleCharts.api.visualization.arrayToDataTable(data);
            var chart = new GoogleCharts.api.visualization.PieChart(div);

            chart.draw(visData, options);
        },

        /**
         * Charge un diagramme
         */
        loadChart() {
            let el = document.getElementById('piechart');
            if (typeof el !== 'undefined') {
                GoogleCharts.load(this.drawChart);
            }
        }
    },

    updated() {
        this.loadChart();
    },

    mounted() {
        this.loadChart();
        GoogleCharts.load(this.drawChart);
        window.addEventListener("resize", this.drawChart);
    }
}
</script>