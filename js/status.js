function ping(ip, callback) {

    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('ON');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('ON', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, 1000);
    }
}

var CompletePingModel = function (completeServers){
    var self = this;
    var myServers = [];
    ko.utils.arrayForEach(completeServers, function(location){
        
        myServers.push({
            name: location.serverIp,
            status: ko.observable('unchecked'),
            server: location.serverName,
            tel: location.telefone
        });
    });

    self.completeServers = ko.observable(myServers);
    ko.utils.arrayForEach(self.completeServers(), function (s){
        s.status('checando');
        new ping(s.name, function (status, e ){
            s.status(status);
        });
    });
}

var komodel = new CompletePingModel ([
    {serverIp: '10.1.1.1', serverName: "SEDE", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.2', serverName: "SERRA", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.4', serverName: "CIVEL", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.5', serverName: "TRIBUNAIS", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.6', serverName: "CARIACICA", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.7', serverName: "ALMOXARIFADO", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.8', serverName: "VILA VELHA", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.9', serverName: "COLATINA", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.10', serverName: "CIASE/NUDIM", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.11', serverName: "TRADE CENTER", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.12', serverName: "CACHOEIRO", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.13', serverName: "GUARAPARI", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.14', serverName: "VIANA", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.15', serverName: "LINHARES", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.16', serverName: "SÃO MATEUS", telefone: "(27) XXXX-XXXX "},
    {serverIp: '10.1.1.17', serverName: "CASA DO CIDADÃO", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.18', serverName: "CENTRO A. INF. JUV.", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.19', serverName: "CTV", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.20', serverName: "ALEGRE", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.21', serverName: "ARACRUZ", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.22', serverName: "BOM JESUS", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.23', serverName: "DOMINGOS MARTINS", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.24', serverName: "IBIRAÇU", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.25', serverName: "ITAPEMIRIM", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.26', serverName: "MARATAIZES", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.27', serverName: "MIMOSO DO SUL", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.28', serverName: "NOVA VENÉCIA", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.29', serverName: "PIÚMA", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.30', serverName: "SANTA LEOPOLDINA", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.31', serverName: "SANTA MARIA", telefone: "(27) XXXX-XXXX "},
    {serverIp: '10.1.1.32', serverName: "SÃO GABRIEL", telefone: "(27) XXXX-XXXX"},
    {serverIp: '10.1.1.33', serverName: "VENDA NOVA", telefone: "(27) XXXX-XXXX"},
]);

ko.applyBindings(komodel);

$(document).ready(function() {
	$('input#refresh').bind('click', function() {
		$.getJSON('https://json-generator.com/api/json/get/4yIDEw8S-', function(json) {
          var texto = JSON.stringify(json);
		  $('div#lista').html(texto);
        });
	});
});

function divClick(element) {
    var server = ko.dataFor(element);
    alert(` O telefone de contato de ${server.server} é ${server.tel}`);
  }