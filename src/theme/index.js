export default {
    font: 'Lato',
    colors: {
        primary: '#6AB9E8',
        secondary: '#E84923',
        blue: '#01579B',
        buttonCadastro: '#E53935',
        tertiary: '#2B5CA6',
        iconBack: '#81CAEF',
        title: '#005992',
        placeholder: '#546E7A',
        errors: '#F44336',
        labelBorderColor: '#FFFFFF',
        labelBorderDarkColor: '#505458',
    },
    config: {
        buttonHeight: 45,
        buttonRadius: 8,
        inputHeightBase: 50,
        inputFontSize: 14,
        inputLineHight: 24,
        defaultPadding: 8,
        placeholder: '#546E7A',
        get animationHeightBase() {
            return(this.inputHeightBase - this.inputLineHight) / 2
        },
        get label() {
            return {
                fontSize: this.inputFontSize - 2,
                color: this.placeholder
            }
        }
    }
}