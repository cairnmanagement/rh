<template>
    <div class="card">
        <div class="card-body">
            <h3>Évolution des effectifs</h3>
            <div id="curve_chart" style="width: 99%"></div>

            <div>
                {{tabContractsByMonth}}
            </div>
        </div>
    </div>
</template>
<script>

    import {GoogleCharts} from 'google-charts';
    
    
    export default {
        
        
        data() {
		return {
			
            tabContractsByMonth: {},
		}
	},
    
        methods: {

            displayStatsContractsbyMonth(){
            let apiUrl = 'structurePersonnelContrat/GET/compteur?byMonth=true&nbMonth=8';
            this.$app.apiGet(apiUrl)
            .then((data) => {
                this.tabContractsByMonth = data;
                console.log('contrats par mois ', this.tabContractsByMonth);
            })
            .catch(this.$app.catchError);
        },
    
            
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
                    ['Month', 'CDI', 'CDD','Professionnalisation', 'Apprentissage', 'Stage','TOTAL'],
                    ['Avr 2022',  11,   2,  6,1,1, 21],
                    ['Mai 2022',  9,   2,  12,1,1, 25],
                    ['Juin 2022',  9,   2,  4,1,1, 17],
                    ['Juil 2022',  9,  6,  0, 1,1, 17],
                    ['Août 2022',  9,  6,  2,1,1,  19],
                    ['Sept 2022',  9,  2, 5, 1,1, 18],
                    ['Oct 2022',  9,   2,  6,1,0, 18],
                    ['Nov 2022',  9,   2,  6,1,1, 19],

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
             * Charge un  diagramme
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
            this.displayStatsContractsbyMonth();
            window.addEventListener ("resize", this.drawChart);
            GoogleCharts.load(this.drawChart);
        }
    }
    </script>