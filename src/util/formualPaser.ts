const OPERATORS: Array<string> = [
    '+',
    '-',
    '*',
    '/',
]

const IDENTIFIER: Array<string> = [
    '(',
    ')',
    ',',
]

enum TokenType {
    FUNCTION = 'function',
    IDENTIFIER = 'identifier',
    FIELD = 'field',
    OPERATOR = 'operator',
    NUMBER = 'number',
    BLANKCHARACTER = 'blankCharacter',
    ERROR = 'error',
    ENDTOKEN = ''
}

interface FormualToken {
    type: string
    value: string
}

interface FormualOption{
    fields?: Array<string>
    functions?: Array<string>
}

interface FormualParse {
    formual: string
    currentIndex: number
    isSingleChar(ch : string) : boolean
    getChar(index: number) : string
    nextToken() : string
    
}

function createFormualParse(formual : string) : FormualParse {
    return {
        formual,
        currentIndex: 0,
        isSingleChar(ch) {
          return OPERATORS.indexOf(ch) !== -1 || IDENTIFIER.indexOf(ch) !== -1 || /[ \s\r\n]/g.test(ch)
        },
        nextToken: function() {
            if(this.directReturnValue) {
                const temp = this.directReturnValue
                this.directReturnValue = null
                return temp
            }
            let sustained = true
            let token = ""
            let ch
            while(sustained){
                ch = this.getChar(this.currentIndex++)
                if(TokenType.ENDTOKEN === ch) {
                    return token ? token : TokenType.ENDTOKEN
                }
                if(this.isSingleChar(ch)){
                    token = ch
                    sustained = false
                }else if(/[A-z0-9\\.\u4e00-\u9fa5-]+/.test(ch)){
                    token += ch
                    let nextChar = this.getChar(this.currentIndex)
                    if(TokenType.ENDTOKEN === ch || this.isSingleChar(nextChar)){
                        sustained = false
                    }
                } else {
                    this.directReturnValue = ch
                    sustained = false
                }
            }
            return token
        },
        getChar: function(index) {
            if(formual.length <= index){
                return TokenType.ENDTOKEN
            }
            return formual.charAt(index)
        }
    }
}

function parse(formual : string,option: FormualOption = {}) : Array<FormualToken>{
    const formualTokens: Array<FormualToken> = []
    const formualParse: FormualParse = createFormualParse(formual)
    const functions = option.functions || []
    const fields = option.fields || []
    let token: string
    while((token = formualParse.nextToken()) !== TokenType.ENDTOKEN){
        let formualToken: FormualToken
        if(IDENTIFIER.indexOf(token) !== -1){
            //标识符
            formualToken = {type:TokenType.IDENTIFIER,value: token}
        }else if(OPERATORS.indexOf(token) !== -1){
            //操作符
            formualToken = {type:TokenType.OPERATOR,value: token}
        }else if(/^([-+])?\d+(\.[0-9]+)?$/.test(token)){
            //数字
            formualToken = {type:TokenType.NUMBER,value: token}
        }else if(functions.indexOf(token) !== -1){
            //函数
            formualToken = {type:TokenType.FUNCTION,value: token}
        }else if(fields.indexOf(token) !== -1){
            //字段
            formualToken = {type:TokenType.FIELD,value: token}
        }else if(/[ \s\r\n]/g.test(token)){
            //特殊符号
            formualToken = {type:TokenType.BLANKCHARACTER,value: token}
        }else {
            //error
            formualToken = {type:TokenType.ERROR,value: token}
        }
        formualTokens.push(formualToken)
    }
    return formualTokens
}

function parseFormual(formual : string,option: FormualOption) : Array<FormualToken> {
    return parse(formual,option)
}

export {
    FormualToken,
    FormualOption,
    TokenType,
    parseFormual
}