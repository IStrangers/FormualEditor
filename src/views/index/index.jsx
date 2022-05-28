import './index.scss'
import FormualEditor from 'components/FormulaEditor'

function Index() {

    const formualTokens = [
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