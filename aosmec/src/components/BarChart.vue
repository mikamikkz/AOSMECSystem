<script>
import { Bar } from "vue-chartjs";
export default {
  name: "BarChart",
  extends: Bar,
  data() {
    return {};
  },
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    backgroundColor: {
      type: Array,
    },
  },
  watch:{
    chartData:function(){
      this.updateChart();
    },
  },
  mounted(){
    this.updateChart();
  },
  methods: {
    updateChart(){
      const dates = this.chartData.map((d) => d.date);
      const totalCheckIn = this.chartData.map((d) => d.totalCheckIn);
      const totalCheckOut = this.chartData.map((d) => d.totalCheckOut);
      this.renderChart(
        {
          labels: dates,
          datasets: [
            {
              label: this.label[0],
              data: totalCheckIn,
              backgroundColor: this.backgroundColor[0],
            },
            {
              label: this.label[1],
              data: totalCheckOut,
              backgroundColor: this.backgroundColor[1],
            },
          ],
        },
        this.options
      );
    }
  },
};
</script>