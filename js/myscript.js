$(document).ready(function() {
	function readStawka(){
		var valueAmount = +$('#amount').val(),
			stawka = 0;
		if (valueAmount > 10000 || valueAmount < 100){
			toastr.error('Akceptujemy płatności tylko w zakresie od 100 do 10 000 zł');
			return;
	    }
		if (valueAmount < 1001){
			stawka = 20;
		} else if (valueAmount < 3001){
			stawka = 70;
		} else if (valueAmount < 6001){
			stawka = 130;
		} else if (valueAmount < 9001){
			stawka = 180;
		} else if (valueAmount < 20000){
			stawka = 200;
		} 
		return stawka;
	}
	
	function a() {
	
	
	}

	function readInsurance(){
		var valueInsurance = $('.Insurance:checked').val();
		if (!valueInsurance){
			toastr.error('Proszę wybrać jeden z 2 wariantów ubezpieczenia');
			return;
	    }
	    return valueInsurance;
	}
	function readPaymentTimes(){
		var valuePT= $('.PaymentTimes:checked').val();
		if (!valuePT){
			toastr.error('Proszę wybrać jeden z 3 wariantów płatności');
			return;
	    }
	    return +valuePT;
	}
	function calculatePayment(valueInsurance,paymentTimes,stawka){
		var insurancePercent = 0,
			paymentTypePercent = 0,
			result;

		if (valueInsurance === '1'){
			insurancePercent = 8;
		}
		else {
			insurancePercent = -5;
		}

		if (paymentTimes === 4){
			paymentTypePercent = 4;
		}
		else if (paymentTimes === 1){
			paymentTypePercent = -2;
		}

		result = stawka * (insurancePercent / 100 + 1) * (paymentTypePercent / 100 + 1);
		return Math.ceil(result);
	}
	
	
	$('#mybtn').click(function () {
		
		var valueInsurance = readInsurance();

		if (!valueInsurance){
			return;
		}

		var paymentTimes = readPaymentTimes();
		if (!paymentTimes){
			return;
		}


		var stawka = readStawka();
		if (!stawka){
			return;
		}

		var payment = calculatePayment(valueInsurance,paymentTimes,stawka);

		toastr.success('Wasza skladka ubezpieczenia równa ' + payment);

	});

}); //end of ready;