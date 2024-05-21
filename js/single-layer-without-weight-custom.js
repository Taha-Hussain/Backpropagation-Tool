$( document ).ready(function() {
    $('#calculate-btn').click(function(){
        
        var weight = $('#weight').val();
        var j1 = $('#j1').val();
        var j2 = $('#j2').val();

        var j1Array = j1.split(',');
        var net1 = 0;
        j1Array.forEach(element => {
            net1 += (weight*element);
        });
        var j2Array = j2.split(',');
        var net2 = 0;
        j2Array.forEach(element => {
            net2 += (weight*element);
        });
        $('#net-j1-output').val(net1);
        $('#net-j2-output').val(net2);

        $('#linear-bipolar-y1').val(net1);
        $('#linear-bipolar-y2').val(net2);

        if(net1 > 0)
        {
            $('#linear-unipolar-y1').val(net1);
        }
        else
        {
            $('#linear-unipolar-y1').val(0);
        }

        if(net2 > 0)
        {
            $('#linear-unipolar-y2').val(net2);
        }
        else
        {
            $('#linear-unipolar-y2').val(0);
        }

        var tanh_y1 = (Math.exp(net1)-Math.exp(-net1))/(Math.exp(net1)+Math.exp(-net1));
        $('#tanh-y1').val(tanh_y1);

        var tanh_y2 = (Math.exp(net2)-Math.exp(-net2))/(Math.exp(net2)+Math.exp(-net2));
        $('#tanh-y2').val(tanh_y2);
        
        
        var sigmoid_unipolar_y1 = (1)/(1+Math.exp(-net1));
        $('#sigmoid-unipolar-y1').val(sigmoid_unipolar_y1);
        var sigmoid_unipolar_y2 = (1)/(1+Math.exp(-net2));
        $('#sigmoid-unipolar-y2').val(sigmoid_unipolar_y2);

        var sigmoid_bipolar_y1 = (2)/(1+Math.exp(-net1))-1;
        $('#sigmoid-bipolar-y1').val(sigmoid_bipolar_y1);
        var sigmoid_bipolar_y2 = (2)/(1+Math.exp(-net2))-1;
        $('#sigmoid-bipolar-y2').val(sigmoid_bipolar_y2);


    })
});