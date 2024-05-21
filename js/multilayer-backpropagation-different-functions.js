$(document).ready(function () {
    $('#calculate-btn').click(function () {

        var learning_rate = $('#learning-rate').val();
        var desired_y1 = $('#desired-y1').val();
        var desired_y2 = $('#desired-y2').val();

        var x1 = $('#x1').val();
        var x2 = $('#x2').val();


        var w11 = $('#w11').val();
        var w12 = $('#w12').val();

        var w21 = $('#w21').val();
        var w22 = $('#w22').val();

        var w11_hidden = $('#w11_hidden').val();
        var w12_hidden = $('#w12_hidden').val();
        var w21_hidden = $('#w21_hidden').val();
        var w22_hidden = $('#w22_hidden').val();

        var net1 = x1 * w11 + x2 * w12;
        var net2 = x1 * w21 + x2 * w22;
        $('#net-j1-output').val(net1);
        $('#net-j2-output').val(net2);

        $('#linear-bipolar-y1').val(net1);
        $('#linear-bipolar-y2').val(net2);

        if (net1 > 0) {
            $('#linear-unipolar-y1').val(net1);
        }
        else {
            $('#linear-unipolar-y1').val(0);
        }

        if (net2 > 0) {
            $('#linear-unipolar-y2').val(net2);
        }
        else {
            $('#linear-unipolar-y2').val(0);
        }

        var tanh_y1 = (Math.exp(net1) - Math.exp(-net1)) / (Math.exp(net1) + Math.exp(-net1));
        $('#tanh-y1').val(tanh_y1);

        var tanh_y2 = (Math.exp(net2) - Math.exp(-net2)) / (Math.exp(net2) + Math.exp(-net2));
        $('#tanh-y2').val(tanh_y2);


        var sigmoid_unipolar_y1 = (1) / (1 + Math.exp(-net1));
        $('#sigmoid-unipolar-y1').val(sigmoid_unipolar_y1);
        var sigmoid_unipolar_y2 = (1) / (1 + Math.exp(-net2));
        $('#sigmoid-unipolar-y2').val(sigmoid_unipolar_y2);

        var net1_output_layer = sigmoid_unipolar_y1 * w11_hidden + sigmoid_unipolar_y2 * w12_hidden;
        var net2_output_layer = sigmoid_unipolar_y1 * w21_hidden + sigmoid_unipolar_y2 * w22_hidden;

        $('#net-j1-output-layer').val(net1_output_layer);
        $('#net-j2-output-layer').val(net2_output_layer);


        var sigmoid_unipolar_y1_output_layer = (1) / (1 + Math.exp(-net1_output_layer));
        $('#sigmoid-unipolar-y1-output-layer').val(sigmoid_unipolar_y1_output_layer);
        var sigmoid_unipolar_y2_output_layer = (1) / (1 + Math.exp(-net2_output_layer));
        $('#sigmoid-unipolar-y2-output-layer').val(sigmoid_unipolar_y2_output_layer);


        

        s1_output_layer = sigmoid_unipolar_y1_output_layer * ( 1 - sigmoid_unipolar_y1_output_layer) * (desired_y1 - sigmoid_unipolar_y1_output_layer);
        $('#s1_output_layer').html(s1_output_layer);
        s2_output_layer = sigmoid_unipolar_y2_output_layer * ( 1 - sigmoid_unipolar_y2_output_layer) * (desired_y2 - sigmoid_unipolar_y2_output_layer);
        $('#s2_output_layer').html(s2_output_layer);
        

        $('#w11_hidden_updated').val((learning_rate * s1_output_layer * sigmoid_unipolar_y1) + (+w11_hidden));
        $('#w12_hidden_updated').val((learning_rate * s1_output_layer * sigmoid_unipolar_y2) + (+w12_hidden));

        $('#w21_hidden_updated').val((learning_rate * s2_output_layer * sigmoid_unipolar_y1) + (+w21_hidden));
        $('#w22_hidden_updated').val((learning_rate * s2_output_layer * sigmoid_unipolar_y2) + (+w22_hidden));


        s1_hidden_layer = sigmoid_unipolar_y1 * ( 1 - sigmoid_unipolar_y1) * ((+w11_hidden * s1_output_layer)+(+w21_hidden * s2_output_layer));
        $('#s1_hidden_layer').html(s1_hidden_layer);
        s2_hidden_layer = sigmoid_unipolar_y2 * ( 1 - sigmoid_unipolar_y2) * ((+w12_hidden * s1_output_layer)+(+w22_hidden * s2_output_layer));
        $('#s2_hidden_layer').html(s2_hidden_layer);


        $('#w11_updated').val((learning_rate * s1_hidden_layer * x1) + (+w11));
        $('#w12_updated').val((learning_rate * s1_hidden_layer * x2) + (+w12));

        $('#w21_updated').val((learning_rate * s2_hidden_layer * x1) + (+w21));
        $('#w22_updated').val((learning_rate * s2_hidden_layer * x2) + (+w22));

        // ERROR FUNCTION

        if(desired_y1 != "" && desired_y2 != "")
        {
            var value_difference_y1 = desired_y1 - sigmoid_unipolar_y1_output_layer;
            var value_difference_y2 = desired_y2 - sigmoid_unipolar_y2_output_layer;
    
            $('#value-difference-y1').html(value_difference_y1);
            $('#value-difference-y2').html(value_difference_y2);
    
            root_mean_square = Math.sqrt((Math.pow((value_difference_y1), 2) + Math.pow((value_difference_y2), 2)) / 2)
            $('#sigmoid-root-mean-square').val(root_mean_square);
        }
        

        var sigmoid_bipolar_y1 = (2) / (1 + Math.exp(-net1)) - 1;
        $('#sigmoid-bipolar-y1').val(sigmoid_bipolar_y1);
        var sigmoid_bipolar_y2 = (2) / (1 + Math.exp(-net2)) - 1;
        $('#sigmoid-bipolar-y2').val(sigmoid_bipolar_y2);


        var unipolar_linear_net1_output_layer = sigmoid_bipolar_y1 * w11_hidden + sigmoid_bipolar_y2 * w12_hidden;
        var unipolar_linear_net2_output_layer = sigmoid_bipolar_y1 * w21_hidden + sigmoid_bipolar_y2 * w22_hidden;

        $('#unipolar-linear-net-j1-output-layer').val(unipolar_linear_net1_output_layer);
        $('#unipolar-linear-net-j2-output-layer').val(unipolar_linear_net2_output_layer);

        //SINCE UNIPOLAR LINEAR
        var linear_unipolar_y1_output_layer = 0;
        var linear_unipolar_y2_output_layer = 0;

        if(unipolar_linear_net1_output_layer < 0)
        {
            $('#linear-unipolar-y1-output-layer').val(0);     
        }
        else
        {
            linear_unipolar_y1_output_layer = unipolar_linear_net1_output_layer;
            $('#linear-unipolar-y1-output-layer').val(unipolar_linear_net1_output_layer); 
        }
        if(unipolar_linear_net2_output_layer < 0)
        {
            $('#linear-unipolar-y2-output-layer').val(0);
        }
        else
        {   linear_unipolar_y2_output_layer = unipolar_linear_net2_output_layer;
            $('#linear-unipolar-y2-output-layer').val(unipolar_linear_net2_output_layer);
        }

        linear_unipolar_s1_output_layer = (1) * (desired_y1 - linear_unipolar_y1_output_layer);
        $('#linear_unipolar_s1_output_layer').html(linear_unipolar_s1_output_layer);
        linear_unipolar_s2_output_layer = (1) * (desired_y2 - linear_unipolar_y2_output_layer);
        $('#linear_unipolar_s2_output_layer').html(linear_unipolar_s2_output_layer);


        $('#linear_unipolar_w11_hidden_updated').val((learning_rate * linear_unipolar_s1_output_layer * sigmoid_bipolar_y1) + (+w11_hidden));
        $('#linear_unipolar_w12_hidden_updated').val((learning_rate * linear_unipolar_s1_output_layer * sigmoid_bipolar_y2) + (+w12_hidden));

        $('#linear_unipolar_w21_hidden_updated').val((learning_rate * linear_unipolar_s2_output_layer * sigmoid_bipolar_y1) + (+w21_hidden));
        $('#linear_unipolar_w22_hidden_updated').val((learning_rate * linear_unipolar_s2_output_layer * sigmoid_bipolar_y2) + (+w22_hidden));



        bipolar_sigmoid_s1_hidden_layer = (1/2)*(1-Math.pow(sigmoid_bipolar_y1,2))*((+w11_hidden * linear_unipolar_s1_output_layer)+(+w21_hidden * linear_unipolar_s2_output_layer));
        $('#bipolar_sigmoid_s1_hidden_layer').html(bipolar_sigmoid_s1_hidden_layer);
        bipolar_sigmoid_s2_hidden_layer = (1/2)*(1-Math.pow(sigmoid_bipolar_y2,2))*((+w12_hidden * linear_unipolar_s1_output_layer)+(+w22_hidden * linear_unipolar_s2_output_layer));
        $('#bipolar_sigmoid_s2_hidden_layer').html(bipolar_sigmoid_s2_hidden_layer);


        $('#bipolar_sigmoid_w11_updated').val((learning_rate * bipolar_sigmoid_s1_hidden_layer * x1) + (+w11));
        $('#bipolar_sigmoid_w12_updated').val((learning_rate * bipolar_sigmoid_s1_hidden_layer * x2) + (+w12));

        $('#bipolar_sigmoid_w21_updated').val((learning_rate * bipolar_sigmoid_s2_hidden_layer * x1) + (+w21));
        $('#bipolar_sigmoid_w22_updated').val((learning_rate * bipolar_sigmoid_s2_hidden_layer * x2) + (+w22));
    })
});