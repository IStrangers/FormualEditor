import './index.scss'
import {TokenType} from 'util/formualPaser'

function FormualEditor(props) {

    const {formualTokens} = props;
    
    return (
        <div className="formual-editor" suppressContentEditableWarning contentEditable={true}>
            {
                formualTokens.map(token => {
                    return (
                        token.type === TokenType.FIELD
                        ?
                        <span 
                            className={token.type} key={token.value} 
                            contentEditable={false}
                            dangerouslySetInnerHTML={{__html: `&ZeroWidthSpace;${token.value}&ZeroWidthSpace;`}}>
                        </span>
                        :
                        <span className={token.type} key={token.value}>
                            {token.value}
                        </span>
                    )
                })
            }
        </div>
    )
}

export default FormualEditor