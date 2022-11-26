import './index.scss'
import FormualEditor from 'components/FormualEditor'

function Index() {

    const formual = "SUM(单价*数量,AVG(5,10),MIN(2,8),MAX(8,2),100)*998.88"
    const option = {
        fields: [
            '单价',
            '数量',
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