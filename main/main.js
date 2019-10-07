module.exports = function main(inputs) {
    console.log("Debug Info");
    return printReceipt(inputs);
};

const cola = 'ITEM000000';
const sprite = 'ITEM000001';
const battery = 'ITEM000004';

function printReceipt(inputs){
	let receipt = "";
	let header = '***<store earning no money>Receipt ***\n';
	let prodName;
	let qty;
	let unit;
	let price;
	let ttl;
	let product = [];
	let ttlYuan = 0;
	receipt += header;

	inputs.forEach(function(i){
		price = 0;
		prodName = i.Name;
		price = i.Price;
		switch(i.Barcode){
			case cola:
				if(!product.includes(cola)){
					qty = getQty(inputs, cola);
					ttl = qty * price;
					product.push(cola);
					if(qty > 1){
						unit = ' ' + i.Unit + 's';
					}else{
						unit = ' ' + i.Unit;
					}
					receipt += getProduct(prodName, qty, unit, price.toFixed(2), ttl.toFixed(2));
					ttlYuan += ttl;
				}
				break;
			case sprite:
				if(!product.includes(sprite)){
					qty = getQty(inputs, sprite);
					ttl = qty * price;
					if(qty > 1){
						unit = ' ' + i.Unit + 's';
					}else{
						unit = ' ' + i.Unit;
					}
					product.push(sprite);
					receipt += getProduct(prodName, qty, unit, price.toFixed(2), ttl.toFixed(2));
					ttlYuan += ttl;
				}
			case battery:
				if(!product.includes(battery) && i.Name == 'Battery'){
					qty = getQty(inputs, battery);
					unit = '';
					ttl = qty * price;
					product.push(battery);
					receipt += getProduct(prodName, qty, unit, price.toFixed(2), ttl.toFixed(2));
					ttlYuan += ttl;
				}
		}
	});
	receipt += '----------------------\n' +
            `Total: ${ttlYuan.toFixed(2)} (yuan)\n` +
            '**********************\n';

	
	return receipt;
}

function getQty(prod, id){
	let qty = 0;
	return qty = prod.reduce((acc, cur) => cur.Barcode === id ? ++acc : acc, 0);
}

function getProduct(prodName, qty, unit, price, ttl){
	return `Name: ${prodName}, Quantity: ${qty}${unit}, Unit price: ${price} (yuan), Subtotal: ${ttl} (yuan)\n`;
}

function addTotal(qty, val){
	return qty + val;
}


