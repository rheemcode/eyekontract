declare module 'flutterwave-node-v3' {
    import FlutterWave from "flutterwave-node-v3";

    declare type PaymentMethod = "card" | "bank" | "mobilemoney" | "ussd";

    declare interface Customer {
        email: string;
        phonenumber: string;
        name: string;
    };

    declare interface Customization {
        title: string;
        description: string;
        logo: string;
    };

    declare interface ChargePayload {
        tx_ref: string;
        amount: string | number;
        currency?: string;
        integrity_hash?: string;
        payment_options: PaymentMethod;
        payment_plan?: string;
        redirect_url: string;
        subaccounts?: [];
        meta?: {};
        customizations: Customization,
        customer: Customer
    }

    declare class Charge {
        card: (payload: ChargePayload) => Promise<{}>
        validate: ({ }) => Promise<{}>
        ng: ({ }) => Promise<{}>
        uk: ({ }) => Promise<{}>
        ussd: ({ }) => Promise<{}>
        validate: ({ }) => Promise<{}>
        voucher: ({ }) => Promise<{}>
        bank_transfer: ({ }) => Promise<{}>
    }

    type FlutterCharge = Charge;

    declare class FlutterWave {
        Charge: FlutterCharge
        constructor(public_key: string, public_secret: string, base_url_or_production_flag?: string);

    }

    export { FlutterWave, PaymentMethod, ChargePayload, Customization, Charge, Customer }
}