import React from 'react';
import { Button, Form, Tab, Table, Tabs } from 'react-bootstrap';
import { Autocomplete } from '@material-ui/lab';

import Input from '../components/Input';
import ModalForm from '../components/ModalForm';

import * as Storage from '../services/localStorage';
import { TextField } from '@material-ui/core';

class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      services: [],
      renderModalAddItem: false,
      renderModalAddService: false,
      renderModalCloseSale: false,
      newItem: {
        name: '',
        quantity: 0,
        price: 0,
        priceLow: 0, 
      },
      newService: {
        name: '',
        duration: '',
        price: 0,
        description: '',
      },
      sale: {
        customerName: '',
        customerCPF: '',
        date: '',
        items: [],
        sumItems: 0,
        services: [],
        sumServices: 0,
        sumTotal: 0,
        tempItemSale: {
          name: '',
          quantity: 0,
        },
        tempServiceSale: {
          name: '',
          quantity: 0,
        },
      },
    }

    this.addItem = this.addItem.bind(this);
    this.closeSale = this.closeSale.bind(this);
    this.addService = this.addService.bind(this);
    this.addItemModal = this.addItemModal.bind(this);
    this.clearSaleModal = this.clearSaleModal.bind(this);
    this.addServiceModal = this.addServiceModal.bind(this);
    this.handleModalAddItem = this.handleModalAddItem.bind(this);
    this.handleModalCloseSale = this.handleModalCloseSale.bind(this);
    this.handleModalAddService = this.handleModalAddService.bind(this);
  }

  componentDidMount() {
    if (!Storage.validateUser()) {
      alert('Você não está logado!');
      return this.props.history.push('/');
    }
    Storage.checkDatabase();
    this.setState({
      items: Storage.getItems(),
      services: Storage.getServices(),
    });
  }

  handleModalAddItem() {
    this.setState({ renderModalAddItem: !this.state.renderModalAddItem });
  }

  handleModalAddService() {
    this.setState({ renderModalAddService: !this.state.renderModalAddService });
  }

  handleModalCloseSale() {
    this.setState({ renderModalCloseSale: !this.state.renderModalCloseSale });
  }

  addItem() {
    const { newItem } = this.state;
    Storage.addItem(newItem);
    this.setState({ items: Storage.getItems() });
    this.handleModalAddItem();
    const obj = {
      name: '',
      quantity: 0,
      price: 0,
      priceLow: 0, 
    }
    this.setState({ newItem: obj });
  }

  addService() {
    const { newService } = this.state;
    Storage.addService(newService);
    this.setState({ services: Storage.getServices() });
    this.handleModalAddService();
    const obj = {
      name: '',
      duration: '',
      price: 0,
      description: '',
    }
    this.setState({ newService: obj });
  }

  clearSaleModal() {
    this.setState({
      sale: {
        customerName: '',
        customerCPF: '',
        date: '',
        items: [],
        sumItems: 0,
        services: [],
        sumServices: 0,
        sumTotal: 0,
        tempItemSale: {
          name: '',
          quantity: 0,
        },
        tempServiceSale: {
          name: '',
          quantity: 0,
        },
      },
    });
  }

  async closeSale() {
    const { sale } = this.state;
    await this.setState({
      sale: {
        ...sale,
        tempItemSale: {
          name: '',
          quantity: 0,
        },
        tempServiceSale: {
          name: '',
          quantity: 0,
        },
      }
    });
    Storage.closeSale(sale);
    this.handleModalCloseSale();
    this.clearSaleModal();
  }

  addItemModal() {
    const { name, quantity, price, priceLow } = this.state.newItem;
    const { newItem } = this.state;
    const { renderModalAddItem } = this.state;
    const form = (
      <Form>
        <Form.Group>
          <Form.Label>Produto:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              newItem: { 
                ...newItem, name: target.value 
              }
            })}
            type="text"
            value={name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Quantidade:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              newItem: { 
                ...newItem, quantity: parseInt(target.value)
              }
            })}
            type="number"
            value={quantity}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Preço de Custo:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              newItem: { 
                ...newItem, priceLow: parseInt(target.value) 
              }
            })}
            type="number"
            value={priceLow}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Preço Final:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              newItem: { 
                ...newItem, price: parseInt(target.value) 
              }
            })}
            type="number"
            value={price}
          />
        </Form.Group>
      </Form>
    );

    const footer = (
      <>
        <Button variant="secondary" onClick={this.handleModalAddItem}>Cancelar</Button>
        <Button variant="primary" onClick={this.addItem}>Adicionar Item</Button>
      </>
    );

    return (
      <ModalForm
        show={renderModalAddItem}
        title="Adicionar Item ao Estoque"
        body={form}
        footer={footer}
        onHide={this.handleModalAddItem}
      />
    );
  }

  addServiceModal() {
    const { name, duration, price, description } = this.state.newService;
    const { newService } = this.state;
    const { renderModalAddService } = this.state;
    const form = (
      <Form>
        <Form.Group>
          <Form.Label>Serviço:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              newService: { 
                ...newService, name: target.value 
              }
            })}
            type="text"
            value={name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descrição:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              newService: { 
                ...newService, description: target.value 
              }
            })}
            type="text"
            value={description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Preço:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              newService: { 
                ...newService, price: parseInt(target.value)
              }
            })}
            type="number"
            value={price}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duração:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              newService: { 
                ...newService, duration: target.value 
              }
            })}
            type="text"
            value={duration}
          />
        </Form.Group>
      </Form>
    );

    const footer = (
      <>
        <Button variant="secondary" onClick={this.handleModalAddService}>Cancelar</Button>
        <Button variant="primary" onClick={this.addService}>Adicionar Serviço</Button>
      </>
    );

    return (
      <ModalForm
        show={renderModalAddService}
        body={form}
        footer={footer}
        onHide={this.handleModalAddService}
        title="Adicionar Serviço"
      />
    );
  }

  closeSaleModal() {
    const { tempServiceSale, tempItemSale, sumItems, sumServices } = this.state.sale;
    const { customerName, customerCPF, items, services, sumTotal } = this.state.sale;
    const { date } = this.state.sale;
    const { renderModalCloseSale, sale } = this.state;
    const Services = this.state.services;
    const Items = this.state.items;

    const form = (
      <Form>
        <Form.Group>
          <Form.Label>Nome do Cliente:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              sale: { 
                ...sale, customerName: target.value 
              }
            })}
            type="text"
            value={customerName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>CPF do Cliente: (Opcional)</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              sale: { 
                ...sale, customerCPF: target.value 
              }
            })}
            type="text"
            value={customerCPF}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Data:</Form.Label>
          <Input
            className="form-control"
            onChange={({target}) => this.setState({
              sale: { 
                ...sale, date: target.value 
              }
            })}
            type="date"
            value={date}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adicionar Item:</Form.Label>
          <Autocomplete
            clearOnEscape
            options={Items}
            getOptionLabel={(option) => option.name}
            id="item-select"
            onChange={({target}) => {
              this.setState({
                sale: {
                  ...sale, tempItemSale: {
                    ...tempItemSale,
                    name: target.innerHTML,
                    quantity: 0,
                  }
                } 
              });
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
          <Form.Label>Quantidade:</Form.Label>
          <Input
            className="form-control"
            id="product-quantity"
            onChange={({ target }) => {
                const product = Items.find((a) => (
                  a.name === document.getElementById('item-select').value)
                )
                if (target.value <= product.quantity && target.value >= 0) {
                  this.setState({
                    sale: {
                      ...sale, tempItemSale: {
                        ...tempItemSale, quantity: parseInt(target.value)
                      }
                    }
                  });
                }
            }}
            type="number"
            value={tempItemSale.quantity}
          />
        </Form.Group>
        <Form.Group>
          <Button
            onClick={() => {
              const temp = Items.find((item) => item.name === tempItemSale.name);
              if (temp) {
                let index = 0;
                let itemsSale = [...items];
                index = itemsSale.findIndex((item) => item.name === tempItemSale.name);
                if (index > -1) {
                  itemsSale[index].quantity += tempItemSale.quantity;
                } else {
                  let tempItem = { ...temp };
                  tempItem.quantity = tempItemSale.quantity;
                  if (tempItem.quantity === 0) return;
                  itemsSale.push(tempItem);
                }
                let itemsArray = [...Items];
                index = Items.findIndex((item) => item.name === tempItemSale.name);
                itemsArray[index].quantity -= tempItemSale.quantity;
                this.setState({ 
                  items: itemsArray,
                  sale: {
                    ...sale,
                    items: itemsSale,
                    sumItems: sumItems + (temp.price * tempItemSale.quantity),
                    sumTotal: sumTotal + (temp.price * tempItemSale.quantity),
                    tempItemSale: {
                      ...tempItemSale,
                      quantity: 0,
                    }
                  }
                });
              }
            }}
            variant="info"
          >
            Adicionar Item
          </Button>
        </Form.Group>
        <Form.Group>
          <Form.Label>Adicionar Serviço:</Form.Label>
          <Autocomplete
            clearOnEscape
            options={Services}
            getOptionLabel={(option) => option.name}
            id="service-select"
            onChange={({target}) => {
              this.setState({
                sale: {
                  ...sale, tempServiceSale: {
                    ...tempServiceSale,
                    name: target.innerHTML,
                    quantity: 0,
                  }
                } 
              });
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
          <Form.Label>Quantidade:</Form.Label>
          <Input
            className="form-control"
            id="service-quantity"
            onChange={({ target }) => {
                if (target.value >= 0) {
                  this.setState({
                    sale: {
                      ...sale, tempServiceSale: {
                        ...tempServiceSale, quantity: parseInt(target.value),
                      }
                    }
                  });
                }
            }}
            type="number"
            value={tempServiceSale.quantity}
          />
        </Form.Group>
        <Form.Group>
          <Button
            onClick={() => {
              const temp = Services.find((service) => service.name === tempServiceSale.name);
              if (temp) {
                let index = 0;
                let servicesSale = [...services];
                index = servicesSale.findIndex((service) => service.name === tempServiceSale.name);
                if (index > -1) {
                  servicesSale[index].quantity += tempServiceSale.quantity;
                } else {
                  let tempService = { ...temp };
                  tempService.quantity = tempServiceSale.quantity;
                  if (tempService.quantity === 0) return;
                  servicesSale.push(tempService);
                }
                this.setState({ 
                  sale: {
                    ...sale,
                    services: servicesSale,
                    sumServices: sumServices + (temp.price * tempServiceSale.quantity),
                    sumTotal: sumTotal + (temp.price * tempServiceSale.quantity),
                    tempServiceSale: {
                      ...tempServiceSale,
                      quantity: 0,
                    }
                  }
                });
              }
            }}
            variant="info"
          >
            Adicionar Serviço
          </Button>
        </Form.Group>
        <Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>#</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>R$ {item.price * item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Form.Group>
        <Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>#</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                return (
                  <tr>
                    <td>{service.name}</td>
                    <td>{service.quantity}</td>
                    <td>R$ {service.price * service.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Form.Group>
        <Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Preço dos Produtos</th>
                <th>Preço dos Serviços</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R$ {sumItems}</td>
                <td>R$ {sumServices}</td>
                <td>R$ {sumTotal}</td>
              </tr>
            </tbody>
          </Table>
        </Form.Group>
      </Form>
    );

    const footer = (
      <>
        <Button variant="outline-danger" onClick={this.clearSaleModal}>Limpar</Button>
        <Button variant="secondary" onClick={this.handleModalCloseSale}>Cancelar</Button>
        <Button variant="primary" onClick={this.closeSale}>Finalizar Venda</Button>
      </>
    )

    return (
      <ModalForm
        show={renderModalCloseSale}
        title="Detalhes da Venda"
        body={form}
        footer={footer}
        onHide={this.handleModalCloseSale}
      />
    );
  };

  render() {
    const { items, services } = this.state;

    return (
      <>
        <div style={{ padding: '10px' }}>
          <Button
            onClick={this.handleModalCloseSale}
            size="lg"
            variant="primary"
          >
            Nova Venda
          </Button>{' '}
          <Button
            onClick={this.handleModalAddItem}
            size="lg"
            variant="outline-info"
          >
            Adicionar Item
          </Button>{' '}
          <Button
            onClick={this.handleModalAddService}
            size="lg"
            variant="outline-info"
          >
            Adicionar Serviço
          </Button>
        </div>
        {this.addItemModal()}
        {this.addServiceModal()}
        {this.closeSaleModal()}
        <Tabs defaultActiveKey="items" id="sales">
          <Tab eventKey="items" title="Itens">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Produto</th>
                  <th>Quantidade Disponível</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>R$ {item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="services" title="Serviços">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Serviço</th>
                  <th>Descrição</th>
                  <th>Duração</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => {
                  return (
                    <tr>
                      <td>{service.id}</td>
                      <td>{service.name}</td>
                      <td>{service.description}</td>
                      <td>{service.duration}</td>
                      <td>R$ {service.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default Stock;
