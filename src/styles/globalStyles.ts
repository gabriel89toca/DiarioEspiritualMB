import { StyleSheet } from 'react-native';

// Você pode exportar constantes de cores para usar em outros lugares também
export const Cores = {
    primaria: '#075E54',
    secundaria: '#25D366',
    fundo: '#274253',
    branco: '#FFFFFF',
    cinza: '#666',
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Cores.fundo,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Cores.branco,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
    },
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
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 55,
    },


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
        marginTop: 0,
        alignItems: 'center',
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
        height: 150,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        //marginTop: 10,
        padding: 15,
        textAlignVertical: 'top', 
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eee'
    },
});