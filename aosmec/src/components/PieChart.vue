<script>
import { Doughnut } from "vue-chartjs";
export default {
  name:  "DoughnutChart",
  extends: Doughnut,
  data() {
    return {};
  },
  props: {
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
  mounted() {
    const total = this.chartData.map((d) => d.total);
    const name = this.chartData.map((d) => d.name);
    this.renderChart(
      {
        labels: name,
        datasets: [
          {
            data: total,
            backgroundColor: this.backgroundColor,
          },
        ],
      },
      this.options
    );
  },
};
</script>