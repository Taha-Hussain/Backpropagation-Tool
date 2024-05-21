$(document).ready(function () {
    $('#calculate-btn').click(function () {

        var x1 = $('#x1').val();
        var x2 = $('#x2').val();
        var x3 = $('#x3').val();

        var w11 = $('#w11').val();
        var w12 = $('#w12').val();
        var w13 = $('#w13').val();
        var w21 = $('#w21').val();
        var w22 = $('#w22').val();
        var w23 = $('#w23').val();

        var net1 = x1 * w11 + x2 * w12 + x3 * w13;
        var net2 = x1 * w21 + x2 * w22 + x3 * w23;
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

        // ERROR
        var desired_y1 = $('#desired-y1').val();
        var desired_y2 = $('#desired-y2').val();

        var value_difference_y1 = desired_y1 - sigmoid_unipolar_y1;
        var value_difference_y2 = desired_y2 - sigmoid_unipolar_y2;

        $('#value-difference-y1').html(value_difference_y1);
        $('#value-difference-y2').html(value_difference_y2);

        root_mean_square = Math.sqrt((Math.pow((value_difference_y1), 2) + Math.pow((value_difference_y2), 2)) / 2)
        $('#sigmoid-root-mean-square').val(root_mean_square);
        var learning_rate = $('#learning-rate').val();

        $('#w11_updated').val(+w11 + (value_difference_y1 * learning_rate * x1));
        $('#w12_updated').val(+w12 + (value_difference_y1 * learning_rate * x2));
        $('#w13_updated').val(+w13 + (value_difference_y1 * learning_rate * x3));
        $('#w21_updated').val(+w21 + (value_difference_y2 * learning_rate * x1));
        $('#w22_updated').val(+w22 + (value_difference_y2 * learning_rate * x2));
        $('#w23_updated').val(+w23 + (value_difference_y2 * learning_rate * x3));

        var sigmoid_bipolar_y1 = (2) / (1 + Math.exp(-net1)) - 1;
        $('#sigmoid-bipolar-y1').val(sigmoid_bipolar_y1);
        var sigmoid_bipolar_y2 = (2) / (1 + Math.exp(-net2)) - 1;
        $('#sigmoid-bipolar-y2').val(sigmoid_bipolar_y2);


    })
});