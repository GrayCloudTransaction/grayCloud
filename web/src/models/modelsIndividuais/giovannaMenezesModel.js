var database = require("../../database/config");

function info(func, query) {
    console.log(`[Giovanna Model] - Função: ${func}; \nQuery: ${query}`)
}

function listarProcessos(id_servidor) {
    var query = `
        SELECT COUNT(processo.id) AS qtd_processos FROM processo WHERE processo.fk_servidor = ${id_servidor};
    `;

    info("Listar processos", query);
    return database.executar(query);
}

function listarProcessosConsumidores(id_servidor) {
    var query = `
        SELECT COUNT(id) AS qtd_processos_consumidores FROM processos_consumidores WHERE fk_servidor = ${id_servidor};
    `;

    info("Listar processos que mais consomem CPU", query);
    return database.executar(query);
}

function buscarUltimosProcessos(id_servidor) {
    var query = `
        SELECT * FROM processo WHERE fk_servidor = ${id_servidor} ORDER BY uso_cpu;
    `

    info("Buscar último processos", query)
    return database.executar(query);
}

function buscarProcessosConsumidores(id_servidor) {
    // var query = `
    //     DROP VIEW IF EXISTS processos_consumidores;
    // `

    // var query2 = `
    //     CREATE VIEW processos_consumidores AS
    //     SELECT * FROM processo
    //         WHERE uso_cpu > ${filtro}
    //         AND fk_servidor = ${id_servidor}
    //         ORDER BY uso_cpu;
    // `

    var query = `
        SELECT * FROM processos_consumidores WHERE fk_servidor=${id_servidor} ORDER BY uso_cpu ;
    `

    info("Listar processos consumidores", query);
    return database.executar(query);
}

function getServidorPorUsoCpu() {
    var query = `
        SELECT servidor.codigo, COUNT(processos_consumidores.id) AS qtd_processos_consumidores 
        FROM servidor 
        JOIN processos_consumidores ON fk_servidor = id_servidor 
        GROUP BY id_servidor;
    `

    info("Reunindo dados dos servidores que mais utilizaram a cpu", query);
    return database.executar(query);
}

module.exports = {
    listarProcessos,
    listarProcessosConsumidores,
    buscarUltimosProcessos, 
    buscarProcessosConsumidores,
    getServidorPorUsoCpu
};
