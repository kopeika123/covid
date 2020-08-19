<template>
    <v-container>
        <v-row style="text-align: center">
            <v-col cols="12">
                <v-spacer/>
            </v-col>
            <v-flex xs12 md12>
                <h1 style="color:rgb(33, 43, 54)">Страны</h1>
            </v-flex>
        </v-row>
        <v-row align="center">
            <v-flex xs12 md4/>
            <v-flex xs12 md4>
                <model-select
                        :options="country"
                        @input="changeCountry"
                        v-model="selectedCountry"
                        placeholder="Select Country"
                />
            </v-flex>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-spacer/>
            </v-col>
            <v-flex xs12 md12>
                <p class="tiya">Последнее обновление: {{ countriesUpdate.lastUpdate }}</p>
            </v-flex>
        </v-row>
        <v-alert dense outlined type="error" color="red" v-if="countryError">К сожалению! Информацию о стране найти не удалось.</v-alert>
        <v-row>
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-text class="white">
                        <v-responsive class="h2">{{ confirmed}}</v-responsive>
                        <h2 class="h2">Подвержденные</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-text class="white">
                        <v-responsive class="h2">{{ recovered}}</v-responsive>
                        <h2 class="h2">Выздоровели</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-text class="white">
                        <v-responsive class="h2">{{ death}}</v-responsive>
                        <h2 class="h2">Смертей</h2>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import countries from "./countries.json";
    import {ModelSelect} from "vue-search-select";
    import moment from "moment";
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'Covid',
        components: {ModelSelect},
        data() {
            return {
                selectedCountry: {value: "RU", text: ""},
                country: [],
                countriesUpdate: {
                    confirmed: 0,
                    deaths: 0,
                    recovered: 0,
                    lastUpdate: ""
                },
                confirmed: 0,
                recovered: 0,
                death: 0,
                countryError: false,
            }

        },
        created() {
            this.getCountries()
            this.changeCountry()
        },
        methods: {
            ...mapActions(['lastUpdateAction', 'confirmedAction']),
            changeCountry() {
                this.lastUpdateAction().then(data => {
                    moment.locale('ru')
                    this.countriesUpdate.lastUpdate = moment(data.lastUpdate).format("DD MMMM YYYYг., h:mm:ss a");
                    this.confirmedAction([data.countryDetail.pattern.replace('[country]', ''),this.selectedCountry.value]).then(item =>{
                        this.confirmed = item.confirmed.value;
                        this.recovered = item.recovered.value;
                        this.death = item.deaths.value;
                    }).catch(() => {
                        this.countryError = true;
                        setTimeout(() => {
                            this.countryError = false;
                        }, 3000);
                    })
                })
            },

            getCountries() {
                for (let [text, value] of Object.entries(countries)) {
                    this.country.push({text, value});
                }
            },

        },
        computed: {
            ...mapState(['confirm']),
            confirmedStat() {
                return this.confirm
            },
        },

    }
</script>

<style>
    .tiya {
        text-decoration: none;
        color: rgb(76, 175, 80) !important;
        text-align: center
    }
    .h2 {
        text-align: center;
    }
</style>
