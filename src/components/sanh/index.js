import List from './List'
import Loading from './Loading'
import SelectTime from './SelectTime'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import Date from './Date'
import DateTime from './DateTime'
import Switch from './Switch'
import SelectPerson from './SelectPerson'
import Form from './Form'

const components= [
  List,
  Loading,
  SelectTime,
  Input,
  Textarea,
  Select,
  Date,
  DateTime,
  Switch,
  SelectPerson,
  Form
]

const install = function(Vue) { 
  components.forEach(component => {
    let name = component.name
    Vue.component(name, component);
  })
}

export default {
  install
}
