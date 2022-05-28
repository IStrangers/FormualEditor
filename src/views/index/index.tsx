import './index.scss'
import FormualEditor from 'components/FormualEditor'


function Index() {

    const formualTokens: Array<FormualToken> = [
        {
            type: "function",
            value: "SUM"
        },
        {
            type: "bracket",
            value: "("
        },
        {
            type: "field",
            value: "字段"
        },
        {
            type: "bracket",
            value: ")"
        },
        {
            type: "operator",
            value: "+"
        },
        {
            type: "number",
            value: "999.99"
        }
    ]

    return (
        <div>
            <FormualEditor formualTokens={formualTokens}></FormualEditor>
        </div>
    )

}

export default Index