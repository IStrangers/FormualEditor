import './index.scss'
import FormualEditor from 'components/FormualEditor'

function Index() {

    const formual = "SUM(金额)*998.88"

    return (
        <div>
            <FormualEditor formual={formual}></FormualEditor>
        </div>
    )

}

export default Index