import { Component } from 'react';

class Multiselect extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedOptions: props.selectedOptions || [],
         searchTerm: '',
      };
   }

   handleSelectionChange = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions).map((option) => ({
         label: option.label,
         value: option.value,
      }));

      this.setState({ selectedOptions });
      this.props.onSelectionChange(selectedOptions);
   };

   handleSearchChange = (e) => {
      this.setState({ searchTerm: e.target.value });
   };

   handleClearSelection = () => {
      this.setState({ selectedOptions: [] });
      this.props.onSelectionChange([]);
   };

   render() {
      const { options } = this.props;
      const { selectedOptions, searchTerm } = this.state;

      // фильтруем опции на основе строки поиска
      const filteredOptions = options.filter((option) =>
         option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
         <div>
            <input
               type='text'
               placeholder='Type here'
               value={searchTerm}
               onChange={this.handleSearchChange}
               className='block w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
            />
            <select
               multiple
               value={selectedOptions.map((o) => o.value)}
               onChange={this.handleSelectionChange}
               className='block w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
            >
               {filteredOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                     {o.label}
                  </option>
               ))}
            </select>
            <button
               onClick={this.handleClearSelection}
               className='mt-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none'
            >
               Clear Selection
            </button>
         </div>
      );
   }
}

export default Multiselect;
