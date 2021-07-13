/*
 * Criamos o nosso módulo
 * Observe que estamos carregando os seguintes módulos externos:
 * ngRoute: Controle de rotas
 * ngMask: Criação de máscaras de entrada de dados 
 **/

var app = angular.module('locacaoApp', ['ngRoute', 'ngMask'])

    // Define o roteamento de acordo com a URL informada pelo usuário
    // Dependendo da URL irá verificar se o usuário está logado

    .config(['$routeProvider', function ($routeProvider) {
        ''
        // Definindo qual view será aberta em cada rota da aplicação

        $routeProvider
            .when('/menu', {
                templateUrl: 'views/menu.html'
            })

            .when('/veiculos', {
                templateUrl: 'views/veiculos.html'
            })

            .otherwise({
                redirectTo: '/menu'
            });

    }])

app.controller('locacaoController',
    function ($scope, $http, $window, $rootScope) {
        /*
         * 
         * Serviços RESTFUL
         * 
         **********************************************************/
        var urlBase = 'http://localhost:3000';

        /*********************************************************
         *              
         */
        $scope.mensagem = { cor: 'success', titulo: '' }

        /* Funções do cadastro dos veículos */

        $scope.salvaVeiculo = function (veiculo) {

            // Iremos verificar se vamos incluir ou alterar

            if (veiculo._id === undefined) {
                $http({

                    method: 'post',
                    url: urlBase + '/veiculos',
                    data: veiculo

                }).then(function (response) {

                    $scope.mensagem = {
                        cor: 'success',
                        titulo: 'Veículo incluído com sucesso!'
                    }

                    // Atualiza a listagem

                    getVeiculos()

                }, function (error) {

                    $scope.mensagem = {
                        cor: 'danger',
                        titulo: error.data.message
                    }

                })

            } else {

                $http({

                    method: 'put',
                    url: urlBase + '/veiculos/' + veiculo._id,
                    data: veiculo

                }).then(function (response) {

                    $scope.mensagem = {
                        cor: 'success',
                        titulo: 'Veículo alterado com sucesso!'
                    }

                    // Atualiza a listagem

                    getVeiculos()

                }, function (error) {

                    $scope.mensagem = {
                        cor: 'danger',
                        titulo: error.data.message
                    }

                })
            }
        }

        // Função para carregar os veículos

        $scope.carregaVeiculos = function () {

            getVeiculos()
        }

        function getVeiculos() {

            // Inicializando o array vazio

            $scope.dados = { veiculos: null, veiculo: null }

            // Faremos uma chamada GET ao servidor

            $http({

                method: 'get',
                url: urlBase + '/veiculos'

            }).then(function (response) {

                $scope.dados = { veiculos: response.data }
            }, function (error) {

                $scope.mensagem = {

                    cor: 'danger',
                    titulo: 'Não foi possível obter os dados. Verifique o back-end!'
                }
            })
        }

        // Apaga o veículo

        $scope.confirmaExclusaoVeiculo = function (veiculo) {

            if (confirm('Confirma a exclusão do veículo com a placa ' + veiculo.placa + ' ?')) {

                $http({

                    method: 'delete',
                    url: urlBase + '/veiculos/' + veiculo._id
                }).then(function (response) {

                    $scope.mensagem = {

                        cor: 'success',
                        titulo: response.data.message
                    }

                    // Vamos atualizar a listagem dos veículos

                    getVeiculos()
                },
                    function (error) {

                        $scope.mensagem = {

                            cor: 'danger',
                            titulo: error.data.message
                        }

                    })
            }
        }

        // Obtendo o veículo pelo ID

        $scope.obtemVeiculoPeloId = function (idVeiculo) {

            $http({

                method: 'get',
                url: urlBase + '/veiculos/' + idVeiculo

            }).then(function (response) {

                $scope.dados = {

                    veiculo: response.data,
                    veiculos: $scope.dados.veiculos
                }

            }, function (error) {

                $scope.mensagem = {

                    cor: 'danger',
                    titulo: error.data.message
                }

            })
        }
    });

app.controller('horaController', function ($scope, $interval) {

    var tick = function () {
        $scope.clock = Date.now();

    };

    tick();
    $interval(tick, 1000);

});