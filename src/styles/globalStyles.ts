import { StyleSheet } from 'react-native';

// Você pode exportar constantes de cores para usar em outros lugares também
export const Cores = {
    primaria: '#075E54',
    secundaria: '#78dd91',
    fundo: '#274253',
    branco: '#FFFFFF',
    preto: '#000',
    cinza: '#eee',
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Cores.fundo,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Cores.fundo,

    },
    headerText: {
        fontSize: 20,
        alignItems: 'center',
        fontWeight: 'bold',
        color: Cores.branco,
        marginRight: 10, // Espaço entre texto e logo
    },
    headerLogo: {
        width: 130,
        height: 35,
        resizeMode: 'contain',
        marginRight: 20,
    },

    header: {
     flexDirection: 'row', justifyContent: 'space-between',
        padding: 15,
        backgroundColor: Cores.branco,
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
        elevation: 5,
    },
    label: { flexDirection: 'row', fontSize: 18, fontWeight: 'bold', color: Cores.primaria,  justifyContent: 'space-between' },

    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Cores.primaria,
    },
    icone: {
        width: 30,
        height: 30,
        marginRight: 10  // Ajuste o tamanho conforme necessário   
    },
    body: { paddingHorizontal: 20, paddingVertical: 10 },


    // Estilos para as datas em linha
    rowDates: { flexDirection: 'row', marginTop:8},
    datePickerButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
        alignItems: 'center',
        elevation: 2
    },
    dateText: { color: '#075E54', fontWeight: 'bold', fontSize: 14 },

    switchRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop:8},
    inputLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    inputLabel2: { color: Cores.secundaria, fontSize: 20, fontWeight: 'bold' },


    /* Estilos para formularios */
    form: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 55,
    },
    button2: {
        backgroundColor: Cores.secundaria,
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonIcone: {
        padding: 5,
        marginBottom: 1,
        },
    button: {
        backgroundColor: '#25D366',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: Cores.branco,
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
        flex: 1,
        height: 100,
        backgroundColor: Cores.cinza,
        borderRadius: 10,
        //marginTop: 10,
        padding: 15,
        textAlignVertical: 'top',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eee', 
        color: Cores.preto
    },

    inputContainer: {backgroundColor: Cores.secundaria, borderRadius: 12, padding: 2, minHeight: 60,
    marginTop: 5, elevation: 2, },

});