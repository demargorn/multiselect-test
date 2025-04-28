import React, { Component } from 'react';

class Multiselect extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isOpen: false, // открыт/закрыт список
         query: '', // поисковый текст
      };

      this.wrapperRef = React.createRef(); // создаем ссылку на список
   }

   // проверяем, что клик мимо выпадающего списка
   handleClickOutside = (e) => {
      if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
         this.setState({ isOpen: false });
      }
   };

   // открыть/закрыть выпадающий список
   handleToggleDropdown = () => this.setState((prev) => ({ isOpen: !prev.isOpen }));

   handleSearch = (e) => {
      this.setState({ query: e.target.value });
   };

   // выбрать опцию
   handleOptionClick = (o) => {
      const isSelected = this.props.selectedOptions.some((i) => i.name === o.name);

      const newSelection = isSelected
         ? this.props.selectedOptions.filter((i) => i.name !== o.name)
         : [...this.props.selectedOptions, o];

      this.props.onSelectionChange(newSelection);
   };

   // удалить опцию
   handleRemoveOption = (id) =>
      this.props.onSelectionChange(this.props.selectedOptions.filter((i) => i.id !== id));

   // очистить выбранные опции
   handleClearAll = () => this.props.onSelectionChange([]);

   componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
   }

   render() {
      const { isOpen, query } = this.state;
      const { options, selectedOptions, placeholder } = this.props;

      // создаем отфильтрованный массив по поисковому слову
      const filteredOptions = options.filter((o) =>
         o.name.toLowerCase().includes(query.toLowerCase())
      );

      return (
         <div className='relative w-full' ref={this.wrapperRef}>
            <div
               className='flex flex-wrap gap-2 mb-2 border rounded p-2'
               onClick={this.handleToggleDropdown}
            >
               {selectedOptions.length === 0 && (
                  <span className='text-gray-400'>{placeholder}</span>
               )}

               {selectedOptions.map((o) => (
                  <div key={o.id} className='flex items-center bg-blue-100 rounded px-2 py-1'>
                     <span className='mr-2'>{o.name}</span>
                     <button
                        onClick={(e) => {
                           e.preventDefault();
                           this.handleRemoveOption(o.id);
                        }}
                        title='delete this option'
                        className='text-gray-500 hover:text-red-600 cursor-pointer'
                     >
                        x
                     </button>
                  </div>
               ))}
            </div>

            {isOpen && (
               <div className='absolute w-full border rounded bg-white z-10'>
                  <input
                     type='text'
                     placeholder='Type here'
                     value={query}
                     onChange={this.handleSearch}
                     className='w-full p-2 border-b focus:outline-none'
                  />

                  <div className='max-h-50 overflow-y-auto'>
                     {filteredOptions.length === 0 ? (
                        <div className='p-2 text-gray-500'>No results</div>
                     ) : (
                        filteredOptions.map((o) => {
                           return (
                              <div
                                 key={o.id}
                                 onClick={() => this.handleOptionClick(o)}
                                 className='p-2 cursor-pointer bg-blue-100 hover:bg-gray-100'
                              >
                                 {o.name}
                              </div>
                           );
                        })
                     )}
                  </div>

                  {selectedOptions.length > 0 && (
                     <div className='border-t p-2'>
                        <button
                           onClick={this.handleClearAll}
                           className='text-red-500 hover:text-red-700'
                        >
                           Clear
                        </button>
                     </div>
                  )}
               </div>
            )}
         </div>
      );
   }
}

export default Multiselect;
