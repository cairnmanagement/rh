<template>
    <div>
        <div class="card-body">
            <h3>Évolution des effectifs</h3>
            <div id="curve_chart"></div>
        </div>
    </div>
</template>
<script>

    import {GoogleCharts} from 'google-charts';
    
    
    export default {
        
        // data() {
        //     return {
        //         displayMode: true
        //     }
        // },
    
        methods: {
    
            
            /**
             * Affiche les timeLines
             */
            drawChart() {
                let div = document.getElementById('curve_chart');
    
                let data = [
                    // ['Task', 'Type de contrat'],
                    // ['CDI',     12],
                    // ['CDD',      45],
                    // ['Apprentissage',  2],
                    // ['Professionalisation', 3],
                    // ['Stage',    2]
                    ['Month', 'CDI', 'CDD','Autres', 'TOTAL'],
                    ['Juil 2022',  21,  6,  2,  29],
                    ['Août 2022',  20,  6,  2,  28],
                    ['Sept 2022',  19,  2, 5,  26],
                    ['Oct 2022',  18,   2,  6, 27]
                ];
    
                let options ={
                    //title: 'Évolution des effectifs',
                    curveType: 'none',
                    legend: {position: 'top', alignment:'center', textStyle:{fontSize: 14,bold:1,}},
                    lineWidth:'3',
                    // slices: {
    
                    //     0:{color: "#0d6efd"},
                    //     1:{color: "#6610f2"},
                    //     2:{color: "#6f42c1"},
                    //     3:{color: "#d63384"},
                    //     4:{color: "#dc3545"},
                    //     5:{color: "#fd7e14"},
                    //     6:{color: "#ffc107"},
                    //     7:{color: "#198754"},
                    //     8:{color: "#20c997"},
                    //     9:{color: "#0dcaf0"},
                    // }
                }
    
                var visData = GoogleCharts.api.visualization.arrayToDataTable(data);
                var chart = new GoogleCharts.api.visualization.LineChart(div);
    
                chart.draw(visData, options);
            },
    
            /**
             * Charge un Chart google c
             */
            loadChart() {
                let el = document.getElementById('curve_chart');
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