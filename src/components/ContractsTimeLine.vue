<template>
    <div class="card">
        <div class="card-body">
            <h3 class="card-title fs-5">Évolution des effectifs</h3>
            <div class="row">
                <div class="col-12">
                    <div id="curve_chart"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {GoogleCharts} from 'google-charts';
    
    
export default {
        
    props: {
        contratStats: Object
    },
    
    methods: {        
        /**
         * Affiche les timeLines
         */
        drawChart() {
            let div = document.getElementById('curve_chart');

            let data = [];

            let i = 0;

            for (const month in this.contratStats) {

                let stats = this.contratStats[month];

                if (!i) {
                    let header = ['Mois'];

                    for (const type in stats) {
                        // Remplacer les underscore par des espace, mettre en majuscule la première lettre de chaque mot du libellé
                        let label = type; // Changer type en une valeur transformée.

                        header.push(label);
                    }

                    data.push(header);
                }

                // Créer une date et la rendrer "lisible" 2022-09-30 > Sept. 2022

                let monthString = month; // Changer month en une valeur transformée.

                let row = [monthString];

                for (const key in stats) {
                    row.push(stats[key]);
                }

                data.push(row);

                i++;
            }

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
        }
    },

    updated() {
        this.drawChart();
    },

    beforeUnmount() {
        window.removeEventListener("resize", this.drawChart);
    },

    mounted() {
        GoogleCharts.load(this.drawChart);
        window.addEventListener("resize", this.drawChart);
    }
}
</script>