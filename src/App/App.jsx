import { Component } from 'react';
import Multiselect from './../Multiselect/Multiselect';

class App extends Component {
   state = {
      selectedOptions: [],
      options: [],
   };

   componentDidMount() {
      this.handleFetchTimezones();
   }

   handleFetchTimezones = async () => {
      try {
         const response = await fetch('https://timeapi.io/api/timezone/availabletimezones');
         const data = await response.json();
         console.log(data);
         const options = data.map((timezone) => ({
            label: timezone,
            value: timezone,
         }));
         this.setState({ options });
      } catch (error) {
         console.error('Error fetching:', error);
      }
   };

   handleSelectionChange = (newOptions) => {
      this.setState({ selectedOptions: newOptions });
   };

   render() {
      return (
         <div className='max-w-md mx-auto mt-10'>
            <h1 className='text-xl font-bold mb-4'>Multiselect</h1>
            <Multiselect
               options={this.state.options}
               selectedOptions={this.state.selectedOptions}
               onSelectionChange={this.handleSelectionChange}
            />
            <div className='mt-4'>
               <h2 className='text-lg font-semibold'>Options:</h2>
               <ul className='list-disc pl-5'>
                  {this.state.selectedOptions.map((option) => (
                     <li key={option.value} className='text-gray-700'>
                        {option.label}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      );
   }
}

export default App;
