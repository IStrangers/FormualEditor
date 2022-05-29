import './index.scss'
import FormualEditor from 'components/FormualEditor'

function Index() {

    const formual = "SUM(金额)*998.88"
    const option = {
        fields: [
            '金额'
        ],
        functions: [
            'COUNT',
            'SUM',
            'AVG',
            'MIN',
            'MAX',
        ]
    }
    return (
        <div>
            <FormualEditor formual={formual} option={option}></FormualEditor>
        </div>
    )

}

export default Index