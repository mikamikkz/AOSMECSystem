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
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    backgroundColor: {
      type: String,
    },
    borderColor: {
      type: String,
    },
    borderWidth: {
      type: String,
    },
  },
  mounted() {
    const dates = this.chartData.map((d) => d.date);
    const totals = this.chartData.map((d) => d.total).reverse();
    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: this.label,
            data: totals,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: this.borderWidth,
          },
        ],
      },
      this.options
    );
  },
};
</script>