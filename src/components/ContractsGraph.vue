<template>
    <div>
        <div id="piechart"></div>
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

    props: {
        contratCurrentStats: Object
    },

    methods: {

        
        /**
         * Affiche un diagramme GoogleChart PIE avec les données fournies
         */
        drawChart() {
            let div = document.getElementById('piechart');

            if (typeof div === 'undefined') {
                return;
            }

            let data = [
                ['Task', 'Type de contrat']
            ];

            for (const key in this.contratCurrentStats) {
                if (key !== 'total') {
                    
                    let typeContrat = key.split('_').join(' ');
                    data.push([typeContrat, this.contratCurrentStats[key]]);
                }
            }

            let options ={
                //contrats en cours
                is3D: false,
                pieHole: 0.4,
                pieSliceText:"value",
                slices: {

                    0:{color: "#28a745"},
                    1:{color: "#007bff"},
                    2:{color: "#6610f2"},
                    3:{color: "#6f42c1"},
                    4:{color: "#fd7e14"},
                    5:{color: "#ffc107"},
                    6:{color: "#20c997"},
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
            GoogleCharts.load(this.drawChart);
        }
    },

    updated() {
        this.loadChart();
    },

    beforeUnmount() {
        window.removeEventListener("resize", this.drawChart);
    },

    mounted() {
        this.loadChart();
        window.addEventListener("resize", this.drawChart);
    }
}
</script>