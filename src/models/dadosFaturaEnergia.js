import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const DadosFaturaEnergia = sequelize.define('DadosFaturaEnergia', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mes_referencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eng_eletrica_qtd: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    eng_eletrica_valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    eng_sceee_ims_qtd: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    eng_sceee_ims_valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    eng_compensada_qtd: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    eng_compensada_valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    contrib_ilum_publica_valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pdf: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    }
}, {
    tableName: 'dados_fatura_energia',
    timestamps: false
});

export { DadosFaturaEnergia };
