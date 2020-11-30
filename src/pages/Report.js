import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Input } from '@material-ui/core';

import ModalForm from '../components/ModalForm';

import * as Storage from '../services/localStorage';

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialDate: '',
      finalDate: '',
      renderModalReport: false,
      report: {
        salesCount: 0,
        itemsCount: 0,
        servicesCount: 0,
        profit: 0,
        totalPrice: 0,
        popularItem: '',
        popularService: '',
      },
    }

    this.handleReportModal = this.handleReportModal.bind(this);
  }

  componentDidMount() {
    if (!Storage.validateUser()) {
      alert('Você não está logado!');
      return this.props.history.push('/');
    }
    Storage.checkDatabase();
  }

  generateReport() {
    const { initialDate, finalDate } = this.state;
    const raw = [...Storage.getSales()];
    const data = [];
    let tempItems = [];
    let tempServices = [];
    let tempSalesCount = 0;
    let tempItemsCount = 0;
    let tempServicesCount = 0;
    let tempProfit = 0;
    let tempTotalPrice = 0;
    raw.forEach((sale) => {
      if (new Date(sale.date) <= new Date(finalDate) && new Date(sale.date) >= new Date(initialDate)) {
        data.push(sale)
      }
    });
    data.forEach((sale) => {
      tempSalesCount += 1;
      let count = 0;
      let cash = 0;
      let totalCash = 0;
      sale.items.forEach((item) => {
        const temp = tempItems.findIndex((a) => a.name === item.name);
        const a = JSON.stringify(item);
        if (temp > -1) {
          tempItems[temp].quantity += JSON.parse(a).quantity;
        } else {
          tempItems.push(JSON.parse(a));
        }
        count += JSON.parse(a).quantity;
        const itemPrice = JSON.parse(a).price * JSON.parse(a).quantity;
        const itemProfit = JSON.parse(a).price - JSON.parse(a).priceLow;
        cash += (itemProfit * JSON.parse(a).quantity);
        totalCash += itemPrice;
      });
      tempItemsCount += count;
      count = 0;
      sale.services.forEach((service) => {
        const temp = tempServices.findIndex((a) => a.name === service.name);
        const a = JSON.stringify(service);
        if (temp > -1) {
          tempServices[temp].quantity += JSON.parse(a).quantity;
        } else {
          tempServices.push(JSON.parse(a));
        }
        count += JSON.parse(a).quantity;
        const servicePrice = JSON.parse(a).price * JSON.parse(a).quantity;
        cash += servicePrice;
        totalCash += servicePrice;
      });
      tempServicesCount += count;
      tempProfit += cash;
      tempTotalPrice += totalCash;
    });
    let pItem = { quantity: 0 };
    let pService = { quantity: 0 };
    tempItems.forEach((item) => {
      if (item.quantity > pItem.quantity) pItem = { ...item };
    });
    tempServices.forEach((service) => {
      if (service.quantity > pService.quantity) pService = { ...service };
    });
    this.setState({
      report: {
        salesCount: tempSalesCount,
        itemsCount: tempItemsCount,
        servicesCount: tempServicesCount,
        profit: tempProfit,
        totalPrice: tempTotalPrice,
        popularItem: pItem,
        popularService: pService,
      }
    });
  }

  handleReportModal() {
    if (!this.state.renderModalReport) this.generateReport();
    this.setState({ renderModalReport: !this.state.renderModalReport });
  }

  showReportModal() {
    const { renderModalReport, initialDate, finalDate } = this.state;
    const { report } = this.state;

    const body = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Setor</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Número de Vendas:</td>
            <td>{report.salesCount}</td>
          </tr>
          <tr>
            <td>Itens Vendidos:</td>
            <td>{report.itemsCount}</td>
          </tr>
          <tr>
            <td>Serviços Prestados:</td>
            <td>{report.servicesCount}</td>
          </tr>
          <tr>
            <td>Lucro Total:</td>
            <td>R$ {report.profit}</td>
          </tr>
          <tr>
            <td>Fluxo de Caixa:</td>
            <td>R$ {report.totalPrice}</td>
          </tr>
          <tr>
            <td>Produto Mais Vendido:</td>
            <td>{report.popularItem.name}<br/>
            {report.popularItem.quantity} Unidades Vendidas</td>
          </tr>
          <tr>
            <td>Serviço Mais Contratado:</td>
            <td>{report.popularService.name}<br/>
            {report.popularService.quantity} Vezes</td>
          </tr>
        </tbody>
      </Table>
    )

    const footer = (
      <>
        <Button variant="secondary" onClick={this.handleReportModal}>Concluir</Button>
      </>
    )

    return (
      <ModalForm
        body={body}
        footer={footer}
        onHide={this.handleReportModal}
        show={renderModalReport}
        title={`Relatório Geral de ${initialDate} a ${finalDate}`}
      />
    );
  }

  render() {
    const { initialDate, finalDate } = this.state;

    return (
      <div className="report-frame">
        <div
          style={{ padding: '10px' }}>
          {this.showReportModal()}
          <Form>
            <Form.Group>
              <Form.Label>Data Inicial:</Form.Label>
              <Input
                className="form-control"
                onChange={({ target }) => this.setState({ initialDate: target.value })}
                type="date"
                value={initialDate}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data Final:</Form.Label>
              <Input
                className="form-control"
                onChange={({ target }) => this.setState({ finalDate: target.value })}
                type="date"
                value={finalDate}
              />
            </Form.Group>
            <Form.Group>
              <Button
              block
                onClick={this.handleReportModal}
                size="lg"
                variant="secondary"
              >
                Gerar Relatório
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default Report;
