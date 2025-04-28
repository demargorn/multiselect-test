import { Component } from 'react';
import Multiselect from './../Multiselect/Multiselect';

const API = 'http://109.67.155.6:8091/api/countries';

class App extends Component {
   state = {
      options: [], // список опций
      selectedOptions: [], // список выбранных опций
   };

   // запрашиваем данные с API
   handleFetchCountries = async () => {
      try {
         const response = await fetch(API);
         const data = await response.json();

         const options = data.map((o) => ({
            id: o.id,
            code: o.code,
            name: o.name,
         }));
         this.setState({ options });
      } catch (error) {
         console.error('Error fetching:', error);
      }
   };

   handleSelectionChange = (newOptions) => {
      this.setState({ selectedOptions: newOptions });
   };

   // очистить опции
   handleClear = () => this.setState({ selectedOptions: [] });

   componentDidMount() {
      this.handleFetchCountries();
   }

   render() {
      const { options, selectedOptions } = this.state;

      return (
         <section className='container mx-auto p-4 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Select your country</h1>
            <Multiselect
               options={options}
               selectedOptions={selectedOptions}
               onSelectionChange={this.handleSelectionChange}
               placeholder='Choose options'
            />

            {selectedOptions.length > 0 && (
               <div className='mt-4'>
                  <h2 className='text-lg font-semibold'>Selected countries:</h2>
                  <ul className='list-none pl-5'>
                     {selectedOptions.map((o) => (
                        <li key={o.id} className='text-xl'>
                           {o.code} - {o.name}
                        </li>
                     ))}
                  </ul>
                  <button
                     onClick={this.handleClear}
                     className='w-16 border-1 rounded px-1 mt-4 text-lg font-semibold text-red-500 hover:text-red-700 cursor-pointer'
                  >
                     Clear
                  </button>
               </div>
            )}
         </section>
      );
   }
}

export default App;
