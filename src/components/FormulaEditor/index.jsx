import './index.scss'

function FormualEditor(props) {

    const {formualTokens} = props;

    const handlingKeyDown = event => {
        if(event.key === "Backspace"){
            
        }
    }
    
    return (
        <div className="formual-editor" contentEditable={true} onInput={handlingKeyDown}>
            {
                formualTokens.map(token => {
                    return (
                        <span className={token.type}>
                            {token.value}
                        </span>
                    )
                })
            }
        </div>
    )
}

export default FormualEditor