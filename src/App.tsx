import './App.css'
// import DynamicForm from './components/DynamicForm'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DynamicAccordionForm from './components/DynamicAccordianForm';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='containerdiv'>
        <h1 className='pageHeading'>Welcome to React hook form</h1>
        <DynamicAccordionForm />
      </div>
    </LocalizationProvider>
  )
}

export default App
