import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontSize: 13,
  },
  mb_10: {
    marginBottom: 10,
  },
  ml_a: {
    marginLeft: "auto",
  },
  mr_a: { marginRight: "auto" },
  author: {
    flexDirection: "column",
  },
  floatRight: {
    marginLeft: "auto",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    gap: 3,
    borderRadius: 5,
    overflow: "hidden",
  },
  header_content: {
    backgroundColor: "#fafafa",
    padding: 10,
    flex: "1 1 50%",
  },
  test: {
    gap: 3,
    flexDirection: "column",
    flex: "1 1 50%",
  },
  label: {
    color: "#999",
    fontSize: 10,
    marginBottom: 2,
  },
  itemLine: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fdfdfd",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  subtext: {
    color: "#999",
  },
});

export const PdfGenerator = ({ invoice }: { invoice: TInvoice }) => {
  return (
    <Document title={invoice.author.name + "_Facture_" + invoice.number}>
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.floatRight,
            styles.mb_10,
            { fontSize: 30, color: "#999", marginBottom: 10 },
          ]}
          fixed>
          <Text>Facture</Text>
        </View>

        <View fixed>
          <Text style={{ fontSize: 24, marginBottom: 25 }}>{invoice.title}</Text>
        </View>

        <View style={styles.header} wrap={false}>
          <View style={styles.test}>
            <View style={{ padding: 10, backgroundColor: "#fafafa" }}>
              <Text style={styles.label}>Facturé par :</Text>
              <Text>{invoice.author.name}</Text>
            </View>
            <View style={styles.header}>
              <View style={styles.header_content}>
                <Text style={styles.label}>Addresse: </Text>
                <Text style={{ flexWrap: "wrap", flexDirection: "row" }}>
                  {invoice.author.address.street}
                </Text>
                <Text>
                  {invoice.author.address.zip} {invoice.author.address.city}
                </Text>
              </View>
              <View style={styles.header_content}>
                <Text style={styles.label}>Document NO:</Text>
                <Text>{invoice.number}</Text>
              </View>
            </View>
          </View>
          <View style={styles.test}>
            <View style={{ padding: 10, backgroundColor: "#fafafa" }}>
              <Text style={styles.label}>Facturé à :</Text>
              <Text>
                {invoice.client.name} {invoice.client.surname}
              </Text>
              <Text>{invoice.client.address.street}</Text>
              <Text>
                {invoice.client.address.zip} {invoice.client.address.city}
              </Text>
            </View>
            <View style={styles.header}>
              <View style={styles.header_content}>
                <Text style={styles.label}>Date facture :</Text>
                <Text>{new Date(invoice.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.header_content}>
                <Text style={styles.label}>Date d'échéance :</Text>
                <Text>{new Date(invoice.dueDate).toLocaleDateString()}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 10 }}></View>

        {invoice.items &&
          invoice.items.length &&
          invoice.items.map((item) => {
            return (
              <View style={styles.itemLine} key={item.id}>
                <View style={{ width: "75%" }}>
                  <Text>{item.name}</Text>
                  <Text style={styles.subtext}>{item.description}</Text>
                </View>
                <View style={{ width: "10%" }}>
                  <Text style={styles.ml_a}>{item.price}€</Text>
                  <Text style={[styles.subtext, styles.ml_a]}>
                    + {(item.tax.percentage / 100) * item.price}€
                  </Text>
                </View>
                <View style={{ width: "5%" }}>
                  <Text style={styles.ml_a}>x{item.quantity}</Text>
                </View>
                <View
                  style={{
                    width: "10%",
                  }}>
                  <Text style={styles.ml_a}>{item.price * item.quantity}€</Text>
                  <Text style={[styles.subtext, styles.ml_a]}>+ {item.tax.total}€</Text>
                </View>
              </View>
            );
          })}

        <View
          style={{
            marginRight: 10,
            marginLeft: "auto",
          }}
          wrap={false}>
          <Text style={[styles.ml_a, { marginBottom: 10 }]}>Sous total: {invoice.subTotal}€</Text>
          {invoice.tax &&
            invoice.tax.length &&
            invoice.tax
              .sort((a, b) => a.percentage - b.percentage)
              .map((tax) => {
                if (tax.percentage === 0) return;
                return (
                  <Text key={tax.percentage} style={[styles.subtext, styles.ml_a]}>
                    TVA {tax.percentage}% : {tax.total}€
                  </Text>
                );
              })}
          <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "auto" }}>
            Total: {invoice.total}€
          </Text>
        </View>

        {invoice.is_paid && (
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "rotate(-30deg) scale(3)",
              padding: 10,
              border: "1px solid red",
              borderRadius: 5,
              color: "red",
              opacity: 0.2,
            }}
            fixed>
            <Text>Payé</Text>
          </View>
        )}

        {invoice.is_draft && (
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "rotate(-30deg) scale(8)",
              color: "#666",
              opacity: 0.1,
            }}
            fixed>
            <Text>Brouillon</Text>
          </View>
        )}

        <Text
          render={({ pageNumber, totalPages }) =>
            totalPages > 1 ? `Page ${pageNumber} / ${totalPages}` : undefined
          }
          style={{ textAlign: "center", marginTop: "auto", color: "#666" }}
          fixed
        />
      </Page>
    </Document>
  );
};
