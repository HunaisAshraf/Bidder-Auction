import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  user: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bill: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  product: {
    marginTop: 20,
  },
  table: {
    display: "flex",
    width: "auto",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    padding: 5,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
    wordWrap: "break-word",
  },
  image: {
    width: 50,
    height: 50,
    margin: "auto",
  },
});

const InvoiceDocument = () => (
  <Document>
    <Page size="A4" style={styles.body}>
      <View>
        <Text style={styles.title}>Bidder</Text>
      </View>
      <View style={styles.user}>
        <View>
          <Text style={styles.bill}>BILL To:</Text>
          <Text style={styles.name}>Hunasi</Text>
          <Text style={styles.name}>9568741230</Text>
        </View>
        <View>
          <Text style={styles.name}>
            Invoice No: {Math.round(Math.random() * 100000 + 1)}
          </Text>
          <Text style={styles.name}>
            Invoice Date: {new Date().toLocaleString()}
          </Text>
        </View>
      </View>
      <View style={styles.product}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Product</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Image</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Base Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Bid Price</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {/* {auction.auctionItem.itemName} */}
                KLAJSflasdjdlfjsd
              </Text>
            </View>
            <View style={styles.tableCol}>
              {/* <Image style={styles.image} src={auction.auctionItem.images[0]} /> */}
              <Image
                style={styles.image}
                src="https://marketplace.canva.com/EAETpJ0lmjg/2/0/1131w/canva-fashion-invoice-zvoLwRH8Wys.jpg"
              />
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {/* {auction.auctionItem.basePrice} */}khkjhjhjkhkjhkj
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {/* {auction.bidAmount} */}
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
