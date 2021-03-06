import { mount } from '@vue/test-utils'
import FullCalendar from './wrapper'
import dayGridPlugin from '@fullcalendar/daygrid'

const DEFAULT_PROPS = {
  timeZone: 'UTC',
  plugins: [ dayGridPlugin ]
}

it('should render', function() {
  let wrapper = mount(FullCalendar, { propsData: DEFAULT_PROPS })
  expect(wrapper.find('.fc').exists()).toBe(true)
})

it('should unmount and call destroy', function() {
  let wrapper = mount(FullCalendar, { propsData: DEFAULT_PROPS })
  wrapper.destroy()
  expect(wrapper.emitted()._destroyed).toBeTruthy()
})

it('should handle prop changes', function() {
  let wrapper = mount(FullCalendar, { propsData: DEFAULT_PROPS })
  expect(wrapper.find('.fc-sat').exists()).toBe(true)

  wrapper.setProps({ weekends: false }) // good idea to test a falsy prop
  expect(wrapper.find('.fc-sat').exists()).toBe(false)
})

it('should emit an event', function() {
  let wrapper = mount(FullCalendar, { propsData: DEFAULT_PROPS })
  expect(wrapper.emitted().viewSkeletonRender).toBeTruthy()
})

it('should expose an API', function() {
  let wrapper = mount(FullCalendar, { propsData: DEFAULT_PROPS })
  let calendarApi = wrapper.vm.getApi()
  expect(calendarApi).toBeTruthy()

  let newDate = new Date(Date.UTC(2000, 0, 1))
  calendarApi.gotoDate(newDate)
  expect(calendarApi.getDate().valueOf()).toBe(newDate.valueOf())
})
