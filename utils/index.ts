import { customAlphabet } from "nanoid";
import EyekontactDatabase from "../database/Database";

export const getTransactionID = async () => {
    const generateTransactionID = customAlphabet("123456789abcdekontact", 11);
    let transactionID
    while (true) {
        transactionID = generateTransactionID()
        let isValid = await EyekontactDatabase.createTransactionKey({ id: transactionID })
        if (isValid) return transactionID;
    }
}
