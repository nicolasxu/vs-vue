let store =  {
  debug: true,
  state: {
    invoice: {
      template: {},
      toCompany: {name:'Please Select', language: ''},
      fromCompany: {},
      number: 33,
      invoiceDate: new Date(),
      dueDate: {},
      term: {},
      total: 0,
      note: '',
      items: [
              { description: 'product 1', unitPrice: 33, quantity: 3, subTotal: 12},
              { description: 'product 2', unitPrice: 12, quantity: 3, subTotal: 13},
              { description: 'product 3', unitPrice: 5, quantity: 3, subTotal: 14},
              { description: 'product 4', unitPrice: 99, quantity: 3, subTotal: 15},
              { description: 'product 5', unitPrice: 200, quantity: 3, subTotal: 16},
              { description: 'product Nick', unitPrice: 150, quantity: 3, subTotal: 17}
            ],
      customData: {}
    },
    invoiceRenderData: {}
  },
  createRenderData() {
    this.state.invoiceRenderData = JSON.parse(JSON.stringify(this.state.invoice))
    this.state.invoiceRenderData.invoiceDate = this.formatDate(this.state.invoice.invoiceDate)
    this.calculateDueDate()
    this.state.invoiceRenderData.dueDate = this.formatDate(this.state.invoice.dueDate)
    // console.log(this.state.invoiceRenderData)
  },
  createSendData() {
    // create send data from

    /*
      input InvoiceTermInput {
        day: Int
        desc: String
      }

      input InvoiceInput {  
        toCompanyId: String
        templateId: String
        items: String
        customData: String
        total: Int
        invoiceDate: Int
        dueDate: Int
        term: InvoiceTermInput
        note: String
      }
    */


    let invoice = this.state.invoice


    let invoiceInput = {
      toCompanyId: invoice.toCompany._id,
      templateId: invoice.template._id,
      items: JSON.stringify(invoice.items),
      total: invoice.total,
      invoiceDate: invoice.invoiceDate.getTime().toString(),
      dueDate: invoice.dueDate.getTime().toString(),
      term: invoice.term,
      note: invoice.note
    }
    if (invoice.customData) {
      if (Object.keys(invoice.customData).length > 0) {
        invoiceInput.customData = JSON.stringify(invoice.customData)  
      }
    } else {
        invoiceInput.customData = JSON.stringify({})
    }    

    
    return invoiceInput

  },
  formatDate(date) {

    var options = {   
        day: 'numeric',
        month: 'short', 
        year: 'numeric'
    }

    return date.toLocaleDateString('en-ZA', options)

  },
  calculateDueDate() {
    let invoiceDate = this.state.invoice.invoiceDate // it is a Date() object
    let day = this.state.invoice.term.day // integer, 0, 7, 15, 30
    let dueDate = new Date( invoiceDate.getTime() + 1000*60*60*24*day)
    this.state.invoice.dueDate = dueDate
  },
  removeItemsRow(rowIndex) {
    if (this.debug) {
      console.log('removeItemRow triggered', rowIndex)
    }
    
    if (isNaN(rowIndex)) {
      console.log('rowIndex not a number')
      return
    }
    if (rowIndex < 0 || rowIndex > this.state.invoice.items.length - 1 ) {
      console.log('rowIndex out of range than 0')
      return
    }

    let removedItem = this.state.invoice.items.splice(rowIndex, 1)
    if (this.debug) {
      console.log('removed item', removedItem)
    }
  },
  addNewItemsRow(row = {description: '', unitPrice: 0, quantity: 1, subTotal: 0}) {
    if (this.debug) {
      console.log('addNewRow triggered', row)
    }
    this.state.invoice.items.push(row)
  },
  setItemsRow(rowIndex, row) {

    if (this.debug) {
      console.log('setItemsRow triggered', rowIndex)
    }

    if (isNaN(rowIndex)) {
      console.log('rowIndex not a number')
      return
    }
    if (rowIndex < 0 || rowIndex > this.state.invoice.items.length - 1 ) {
      console.log('rowIndex out of range than 0')
      return
    }

    if (row.description !== void 0) {
      this.state.invoice.items[rowIndex].description = row.description
    }

    if (row.unitPrice !== void 0 && !isNaN (row.unitPrice)) {
      this.state.invoice.items[rowIndex].unitPrice = row.unitPrice
      this._calculateSubTotal(rowIndex)
    }

    if (row.quantity !== void 0 && !isNaN (row.quantity)) {
      this.state.invoice.items[rowIndex].quantity = row.quantity
      this._calculateSubTotal(rowIndex)

    }

    this._calculateTotal()
  },
  _calculateSubTotal(index) {
    if (this.debug) {
      console.log('_calculateSubTotal triggered', index)
    }
    let item = this.state.invoice.items[index]
    let unitPrice = item.unitPrice
    let quantity = item.quantity
    let subTotal = unitPrice * quantity
    item.subTotal = subTotal
  },
  _calculateTotal() {
    if (this.debug) {
      console.log('_calculateTotal triggered')
    }    
    let total = 0
    let items = this.state.invoice.items
    items.forEach((i)=> {
      total = i.subTotal + total
    })
    this.state.invoice.total = total
    console.log('new total:', total)
  },
  calculateAll() {
    let items = this.state.invoice.items

    items.forEach((item, index)=> {
      this._calculateSubTotal(index)
    })

    this._calculateTotal()
  },
  setTerm(term) {
    if (this.debug) {
      console.log('setTerm triggered', term)
    }    
    this.state.invoice.term = term
  },
  setTemplate (template) {
    if (this.debug) {
      console.log('setTemplate triggered', template)
    }     
    this.state.invoice.template = template
  },
  setFromCompany(from) {
    if (this.debug) {
      console.log('setFromCompany triggered', from)
    }     
    this.state.invoice.fromCompany = from
  },
  setToCompany(to) {
    if (this.debug) {
      console.log('setToCompany triggered', to)
    }     
    this.state.invoice.toCompany = to
  },
  setInvoiceDate(date) {
    if (this.debug) {
      console.log('setInvoiceDate triggered', date)
    }     
    this.state.invoice.invoiceDate = date
  },
  setDueDate(dueDate) {
    if (this.debug) {
      console.log('setDueDate triggered', dueDate)
    }     
    this.state.invoice.dueDate = dueDate
  },
  setNote(note) {
    if (this.debug) {
      console.log('setNote triggered', note)
    }     
    this.state.invoice.note = note
  },

}

export default store
