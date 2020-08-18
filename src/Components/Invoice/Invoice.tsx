import React, {Component} from "react";
import moment from "moment";
import './Invoice.scss';
import {Ingredients} from "../../Enum/ingredients.enum";
import {Prices} from "../../Enum/prices.enum";
import {Order} from "../../Models/order.model";
import {Modal} from "../../Helper/Modal/Modal";
import html2canvas from "html2canvas";
import JSPdf from 'jspdf';
import {MoonLoader} from "react-spinners";
import {NotificationService} from "../../Services/notification.service";
import {ClickAwayListener} from "@material-ui/core";

export class Invoice extends Component<InvoiceProps, InvoiceState> {
    state = {
        loading: false,
        invoiceNo: ''
    };

    componentDidMount() {
        this.setState({invoiceNo: (this.props.order?.id + '').substr(-3).toUpperCase() + ' ' + (Math.random() * 100000).toFixed(0).toString()})
    }

    getIngredientPrice = (name: string): number => {
        const ingredient = Object.entries(Ingredients).find(entry => entry[1] === name);
        // @ts-ignore
        return Prices[ingredient[0]];
    }

    getShippingFee = (): number => {
        // @ts-ignore
        const totalIngredientAndExtraCharges = Object.keys(this.props.order.ingredients).map(key => this.getIngredientPrice(key) * this.props.order.ingredients[key]).reduce((a, b) => a + b, 0) + Prices.EXTRA + Prices.TOP_BREAD + Prices.BOTTOM_BREAD;
        return this.props.order.price - totalIngredientAndExtraCharges;
    }

    downloadInvoice = () => {
        this.setState({loading: true});
        html2canvas(document.getElementById('invoice-container') as HTMLElement).then((canvas: HTMLCanvasElement) =>  {
            const img = canvas.toDataURL('image/png');
            const pdf = new JSPdf("p", "mm", "a4");
            pdf.addImage({imageData: img, x: 0, y: 0, width: 210, height: 297});
            pdf.save(`${this.state.invoiceNo}.pdf`);
            this.setState({loading: false});
            setTimeout(_ => {
                this.props.onClose({});
                const notificationService = NotificationService.getInstance();
                notificationService.showNotification('Invoice downloaded successfully', "success");
            }, 1000);
        });
    }

    onClose = (event: any) => {
        if (event.target.className !== 'dwb') {
            this.props.onClose({});
        }
    }

    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <ClickAwayListener onClickAway={this.onClose}>
                    <div className="invoice-container" id="invoice-container">
                        <div className="invoice-container__header">
                            <div className="invoice-container__header__title">Invoice</div>
                            <div className="invoice-container__header__organization-title">The Burger Builder</div>
                            <div className="invoice-container__header__organization-address"> (+91) 1230783143 | build-my-burger.vercel.app | Ghaziabad, India</div>
                        </div>
                        <div className="invoice-container__customer-block">
                            <div className="invoice-container__customer-block__name">{this.props.order.contact.name}</div>
                            <div className="invoice-container__customer-block__customer-address">
                                <span>{this.props.order.contact.address.street}</span>
                                <span>Zip Code:- {this.props.order.contact.address.zip},</span>
                                <span style={{textTransform: 'uppercase'}}>{this.props.order.contact.address.country}</span>
                            </div>
                        </div>
                        <div className="invoice-container__invoice-details">
                            <div className="invoice-container__invoice-details__row">
                                <div className="invoice-container__invoice-details__row__label">Invoice No: </div>
                                <div className="invoice-container__invoice-details__row__value"> {this.state.invoiceNo}</div>
                            </div>
                            <div className="invoice-container__invoice-details__row">
                                <div className="invoice-container__invoice-details__row__label">Date Issued: </div>
                                <div className="invoice-container__invoice-details__row__value">{moment(new Date()).format('MMMM DD, YYYY ( dddd )').toString()}</div>
                            </div>
                            <div className="invoice-container__invoice-details__row">
                                <div className="invoice-container__invoice-details__row__label">Delivered On: </div>
                                <div className="invoice-container__invoice-details__row__value">{moment(this.props.order.delivery_time).format('MMMM DD, YYYY (hh:mm A)')}</div>
                            </div>
                        </div>
                        <div className="invoice-container__order-details">
                            <div className="invoice-container__order-details__table-header">
                                <span>Description</span>
                                <span>Qty</span>
                                <span>Price</span>
                                <span>Amount</span>
                            </div>
                            {
                                Object.entries(this.props.order.ingredients).map((entry) => {
                                    return (
                                        <div className="invoice-container__order-details__table-body-row" key={entry[0]}>
                                            <span>{entry[0].toUpperCase()}</span>
                                            <span>{entry[1]}</span>
                                            <span>₹ {this.getIngredientPrice(entry[0])}</span>
                                            <span>₹ {this.getIngredientPrice(entry[0]) * entry[1]}</span>
                                        </div>
                                    )
                                })
                            }
                            <div className="invoice-container__order-details__table-body-row">
                                <span>BREADS</span>
                                <span>2</span>
                                <span>₹ {Prices.TOP_BREAD + Prices.BOTTOM_BREAD} ({Prices.TOP_BREAD} + {Prices.BOTTOM_BREAD} )</span>
                                <span>₹ {Prices.TOP_BREAD + Prices.BOTTOM_BREAD}</span>
                            </div>
                        </div>
                        <div className="invoice-container__footer">
                            <div className="invoice-container__footer__row">
                                <div className="invoice-container__footer__row__label">Shipping Fee</div>
                                <div className="invoice-container__footer__row__value">₹ {this.getShippingFee()}</div>
                            </div>
                            <div className="invoice-container__footer__row">
                                <div className="invoice-container__footer__row__label">Service Tax</div>
                                <div className="invoice-container__footer__row__value">₹ {Prices.EXTRA}</div>
                            </div>
                            <div className="invoice-container__footer__row">
                                <div className="invoice-container__footer__row__label extra-bold">Total Amount</div>
                                <div className="invoice-container__footer__row__value extra-bold">₹ {this.props.order.price}</div>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
                <div className="download-button dwb">
                    {
                        !this.state.loading ?
                            <img onClick={this.downloadInvoice} src="https://img.icons8.com/carbon-copy/35/000000/download.png" alt="" className="dwb"/> :
                            <div style={{pointerEvents: 'none'}}><MoonLoader color={'black'} size={30} /></div>
                    }
                </div>
            </Modal>
        );
    }
}

interface InvoiceProps {
    open: boolean;
    order: Order;
    onClose: (event: any) => void;
}

interface InvoiceState {
    loading: boolean;
    invoiceNo: string;
}