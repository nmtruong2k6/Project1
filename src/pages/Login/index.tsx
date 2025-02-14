import { Button } from "antd";
import { DatePicker } from "antd";
function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Button type="primary" className="!bg-blue-500 !text-white">
        Click Me
      </Button>
      <DatePicker></DatePicker>
    </div>
  );
}

export default Login;
