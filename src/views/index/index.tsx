import './index.scss'
import FormualEditor from 'components/FormualEditor'
import {FormualToken,parseFormual} from 'util/formualPaser'

function Index() {

    const formualTokens: Array<FormualToken> = parseFormual("SUM(金额)*998.88")
    // const formualTokens: Array<FormualToken> = [
    //     {
    //         type: "function",
    //         value: "SUM"
    //     },
    //     {
    //         type: "bracket",
    //         value: "("
    //     },
    //     {
    //         type: "field",
    //         value: "字段"
    //     },
    //     {
    //         type: "bracket",
    //         value: ")"
    //     },
    //     {
    //         type: "operator",
    //         value: "+"
    //     },
    //     {
    //         type: "number",
    //         value: "999.99"
    //     }
    // ]

    return (
        <div>
            <FormualEditor formualTokens={formualTokens}></FormualEditor>
        </div>
    )

}

export default Index