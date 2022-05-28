const FUNCTIONS: Array<string> = [
    'COUNT',
    'SUM',
    'AVG',
    'MIN',
    'MAX',
]

const OPERATORS: Array<string> = [
    '+',
    '-',
    '*',
    '/',
]

const BRACKETS: Array<string> = [
    '(',
    ')',
]

enum TokenType {
    FUNCTION = 'function',
    BRACKET = 'bracket',
    FIELD = 'field',
    OPERATOR = 'operator',
    NUMBER = 'number',
    ENDTOKEN = ''
}

interface FormualToken {
    type: string
    value: string
}

interface FormualParse {
    formual: string
    currentIndex: number,
    getChar(index: number) : string,
    nextToken() : string,
    
}

function createFormualParse(formual : string) : FormualParse {
    return {
        formual,
        currentIndex: 0,
        nextToken: function() {
            let sustained = true
            let token = "";
            let ch;
            while(sustained){
                ch = this.getChar(this.currentIndex++)
                if(TokenType.ENDTOKEN === ch) {
                    return token ? token : TokenType.ENDTOKEN
                }
                if(OPERATORS.indexOf(ch) !== -1 || BRACKETS.indexOf(ch) !== -1){
                    token = ch
                    sustained = false
                }else if(/[A-z0-9\\.\u4e00-\u9fa5-]+/.test(ch)){
                    token += ch
                    let nextChar = this.getChar(this.currentIndex)
                    if(TokenType.ENDTOKEN === ch || OPERATORS.indexOf(nextChar) !== -1 || BRACKETS.indexOf(nextChar) !== -1){
                        sustained = false
                    }
                }
            }
            return token
        },
        getChar: function(index) {
            if(formual.length <= index){
                return TokenType.ENDTOKEN;
            }
            return formual.charAt(index)
        }
    }
}

function parse(formual : string) : Array<FormualToken>{
    const formualTokens: Array<FormualToken> = []
    const formualParse: FormualParse = createFormualParse(formual)
    let token: string;
    while((token = formualParse.nextToken()) !== TokenType.ENDTOKEN){
        let formualToken: FormualToken;
        if(BRACKETS.indexOf(token) !== -1){
            //括号
            formualToken = {type:TokenType.BRACKET,value: token};
        }else if(OPERATORS.indexOf(token) !== -1){
            //操作符
            formualToken = {type:TokenType.OPERATOR,value: token};
        }else if(/^([-+])?\d+(\.[0-9]+)?$/.test(token)){
            //数字
            formualToken = {type:TokenType.NUMBER,value: token};
        }else if(FUNCTIONS.indexOf(token) !== -1){
            //函数
            formualToken = {type:TokenType.FUNCTION,value: token};
        }else {
            //字段
            formualToken = {type:TokenType.FIELD,value: token};
        }
        formualTokens.push(formualToken)
    }
    return formualTokens
}

function parseFormual(formual : string) : Array<FormualToken> {
    formual = formual.replace(/\s\r\n/g,"")
    return parse(formual)
}

export {
    FormualToken,
    TokenType,
    parseFormual
}