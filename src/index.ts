import {
  QMainWindow,
  QWidget,
  QLabel,
  FlexLayout,
  QPushButton,
  QComboBox,
  QLineEdit,
} from "@nodegui/nodegui";
import convert from "./utilities/converter";

//ventana
const win = new QMainWindow();
win.setWindowTitle("Conversor de unidades de masa");
win.setMinimumSize(900, 416);

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const title = new QLabel();
title.setObjectName("title");
title.setText("Conversor de unidades de peso");

const containerUnidad1 = new QWidget();
containerUnidad1.setObjectName("containerInput");
containerUnidad1.setLayout(new FlexLayout());

const container1 = new QWidget();
container1.setObjectName("c1");
container1.setLayout(new FlexLayout());

const labelInput = new QLabel();
labelInput.setObjectName("mylabel");
labelInput.setText("De");

const inputOptions = new QComboBox();
inputOptions.addItem(undefined, "mg");
inputOptions.addItem(undefined, "g");
inputOptions.addItem(undefined, "kg");

const inputValue = new QLineEdit();
inputValue.setObjectName("input");
inputValue.addEventListener("textChanged", (text) => {
  const sanitizedText = text.replace(/\D/g, "");
  if (!!sanitizedText.length) inputValue.setText(sanitizedText);
  else inputValue.clear();
});

const containerUnidad2 = new QWidget();
containerUnidad2.setObjectName("containerOutput");
containerUnidad2.setLayout(new FlexLayout());

const container2 = new QWidget();
container2.setObjectName("c2");
container2.setLayout(new FlexLayout());

const labelOutput = new QLabel();
labelOutput.setObjectName("mylabel");
labelOutput.setText("A");

const outputOptions = new QComboBox();
outputOptions.addItem(undefined, "mg");
outputOptions.addItem(undefined, "g");
outputOptions.addItem(undefined, "kg");

const outputValue = new QLineEdit();
outputValue.setObjectName("input");
outputValue.setEnabled(false);

const button = new QPushButton();
button.setObjectName("button");
button.setText("Convertir");

const error = new QLabel();
error.setObjectName("error");
error.setText("Para realizar la conversión las medidas no deben ser iguales");
error.hide();

//Logica//

button.addEventListener("clicked", () => {
  error.hide();
  const result = convert(
    inputOptions.currentText(),
    outputOptions.currentText(),
    inputValue.text()
  );
  if (result !== null && result !== undefined) {
    outputValue.setText(result);
  } else {
    error.show();
    outputValue.clear();
    centralWidget.update();
  }
});

container1.layout?.addWidget(labelInput);
container1.layout?.addWidget(inputOptions);
containerUnidad1.layout?.addWidget(container1);
containerUnidad1.layout?.addWidget(inputValue);
container2.layout?.addWidget(labelOutput);
container2.layout?.addWidget(outputOptions);
containerUnidad2.layout?.addWidget(container2);
containerUnidad2.layout?.addWidget(outputValue);
rootLayout.addWidget(title);
rootLayout.addWidget(containerUnidad1);
rootLayout.addWidget(containerUnidad2);
rootLayout.addWidget(button);
rootLayout.addWidget(error);
win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #EBEDEF;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }

    #title{
      color:#008080;
      font-size: 24px;
      font-weight:bold;
      margin-bottom:20px;
    }

    #mylabel {
      font-size: 16px;
      font-weight: bold;
      width:'30%';
    }

    #containerInput,
    #containerOutput{
      flex-direction: 'row';
      margin-bottom: 20px;
      width:'40%';
      padding:20px;
      justify-content:'space-between';
    }

    #input{
      border-style:'none';
      color:#000;
      padding:5px;
      width:'70%';
    }

    #button{
      border-style:'none';
      border-radius: 16px;
      background-color:#008080;
      color:#FFF;
      padding:10px;
    }

    #button:hover{
      background-color:#138D75;
      color:#000080;
    }

    #c1,
    #c2{
      flex-direction:'row';
      width:'30%';
    }

    #error{
      color:red; 
      text-align:center; 
      font-weight:bold;
    }
  `
);
win.show();

(global as any).win = win;
