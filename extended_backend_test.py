import requests
import sys
from datetime import datetime

class ExtendedAPITester:
    def __init__(self, base_url="https://049005b3-d7b9-4dc6-8bec-72aeb528701b.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, expect_error=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {response_data}")
                except:
                    print(f"Response: {response.text[:200]}")
            else:
                if expect_error:
                    print(f"⚠️  Expected error - Status: {response.status_code} (Expected: {expected_status})")
                else:
                    print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}")

            return success, response.json() if response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_invalid_endpoint(self):
        """Test invalid endpoint returns 404"""
        success, response = self.run_test(
            "Invalid Endpoint (404 Test)",
            "GET",
            "api/nonexistent",
            404,
            expect_error=True
        )
        return success

    def test_invalid_method(self):
        """Test invalid method on valid endpoint"""
        success, response = self.run_test(
            "Invalid Method (405 Test)",
            "DELETE",
            "api/",
            405,
            expect_error=True
        )
        return success

    def test_invalid_json_post(self):
        """Test POST with invalid JSON structure"""
        success, response = self.run_test(
            "Invalid JSON POST (422 Test)",
            "POST",
            "api/status",
            422,
            data={"invalid_field": "test"},
            expect_error=True
        )
        return success

    def test_empty_post(self):
        """Test POST with empty body"""
        success, response = self.run_test(
            "Empty POST Body (422 Test)",
            "POST",
            "api/status",
            422,
            data={},
            expect_error=True
        )
        return success

    def test_health_check(self):
        """Test if root endpoint acts as health check"""
        success, response = self.run_test(
            "Health Check (Root Endpoint)",
            "GET",
            "api/",
            200
        )
        return success

def main():
    print("🚀 Starting Extended THRIVECHAOS Backend API Tests")
    print("=" * 60)
    
    # Setup
    tester = ExtendedAPITester()

    # Run extended tests
    print("\n📡 Testing Error Handling and Edge Cases...")
    
    # Test health check
    tester.test_health_check()
    
    # Test error scenarios
    tester.test_invalid_endpoint()
    tester.test_invalid_method()
    tester.test_invalid_json_post()
    tester.test_empty_post()

    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Extended Backend Tests Summary:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("✅ All extended backend tests passed!")
        return 0
    else:
        print("❌ Some extended backend tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())